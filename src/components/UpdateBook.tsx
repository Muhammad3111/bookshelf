import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useUpdateBookMutation } from "../services/books";
import CryptoJS from "crypto-js";
import EditIcon from "@mui/icons-material/Edit";

type ComponentProps = {
  id: number;
  value: number;
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

export default function UpdateBook({ id, value }: ComponentProps) {
  const [status, setStatus] = useState<number | null>(value);
  const [open, setOpen] = useState<boolean>(false);
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generateSign = useCallback(() => {
    const Key = localStorage.getItem("userKey") as string;
    const url = `/books/${id}`;
    const method = "PATCH";
    const body = JSON.stringify({ status });
    const secret = localStorage.getItem("secret") ?? "";
    const Sign = CryptoJS.MD5(`${method}${url}${body}${secret}`).toString();
    return { Key, Sign };
  }, [id, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { Key, Sign } = generateSign();
      await updateBook({ status, Key, Sign, id });
      handleClose();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={handleOpen}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Update Book Status</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <FormControl sx={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Status"
                variant="outlined"
                value={status ?? ""}
                onChange={(e) => setStatus(Number(e.target.value))}
                type="number"
              />
            </FormControl>
            <Button type="submit" variant="contained" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
