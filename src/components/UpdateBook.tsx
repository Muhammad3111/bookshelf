import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useUpdateBookMutation } from "../services/books";
import CryptoJS from "crypto-js";
import EditIcon from "@mui/icons-material/Edit";

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

export default function UpdateBook({ id }: ComponentProps) {
  const [status, setStatus] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const generateSign = () => {
    const Key = localStorage.getItem("userKey") as string;
    const url = `/books/${id}`;
    const method = "PATCH";
    const body = JSON.stringify({ status });
    const secret = localStorage.getItem("secret");
    const Sign = CryptoJS.MD5(`${method}${url}${body}${secret}`).toString();
    return { Key, Sign };
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({
        status,
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
      <Button variant="contained" size="small" onClick={() => handleOpen()}>
        <EditIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4">Update book status</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <FormControl sx={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Status"
                variant="outlined"
                onChange={(e) => setStatus(+e.target.value)}
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
