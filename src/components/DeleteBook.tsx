import { Box, Button, Modal, Typography } from "@mui/material";
import { useDeleteBookMutation } from "../services/books";
import CryptoJS from "crypto-js";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type ComponentProps = {
  id: number;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export default function DeleteBook({ id }: ComponentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const generateSign = () => {
    const Key = localStorage.getItem("userKey") as string;
    const url = `/books/${id}`;
    const method = "DELETE";
    const body = "";
    const secret = localStorage.getItem("secret");
    const Sign = CryptoJS.MD5(`${method}${url}${body}${secret}`).toString();
    return { Key, Sign };
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteBook({
        Key: generateSign()?.Key,
        Sign: generateSign()?.Sign,
        id,
      });
      handleClose();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: "red" }}
        size="small"
        onClick={() => handleOpen()}
      >
        <DeleteIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Delete book</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            Are you sure ?
            <Button type="submit" variant="contained" disabled={isLoading}>
              Submit{" "}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
