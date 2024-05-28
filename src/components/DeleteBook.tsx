import { Box, Button, Modal, Typography } from "@mui/material";
import { useDeleteBookMutation } from "../services/books";
import CryptoJS from "crypto-js";
import { useState, useCallback } from "react";
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
  gap: 2,
};

export default function DeleteBook({ id }: ComponentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generateSign = useCallback(() => {
    const Key = localStorage.getItem("userKey") as string;
    const url = `/books/${id}`;
    const method = "DELETE";
    const body = "";
    const secret = localStorage.getItem("secret") ?? "";
    const Sign = CryptoJS.MD5(`${method}${url}${body}${secret}`).toString();
    return { Key, Sign };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { Key, Sign } = generateSign();
      await deleteBook({ Key, Sign, id });
      handleClose();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={handleOpen}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Delete Book</Typography>
          <Typography>Are you sure you want to delete this book?</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "20px" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={isLoading}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
