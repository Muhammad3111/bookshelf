import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useCreateBookMutation } from "../services/books";
import CryptoJS from "crypto-js";

type ComponentProps = {
  open: boolean;
  handleClose: () => void;
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

export default function AddBooks({ open, handleClose }: ComponentProps) {
  const [isbn, setIsbn] = useState<string>("");
  const [createBook, { isLoading }] = useCreateBookMutation();

  const generateSign = useCallback(() => {
    const Key = localStorage.getItem("userKey") as string;
    const url = "/books";
    const method = "POST";
    const body = JSON.stringify({ isbn });
    const secret = localStorage.getItem("secret") ?? "";
    const Sign = CryptoJS.MD5(`${method}${url}${body}${secret}`).toString();
    return { Key, Sign };
  }, [isbn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { Key, Sign } = generateSign();
      await createBook({ isbn, Key, Sign });
      handleClose();
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Create New Book</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <FormControl sx={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="ISBN of Book"
                variant="outlined"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
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
