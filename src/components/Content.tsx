import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";

interface Book {
  book: {
    id: number;
    isbn: string;
    title: string;
    cover: string;
    author: string;
    published: number;
    pages: 221;
  };
  status: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Content = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [method, setMethod] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await Api({
          url: "/books", // Update with the desired endpoint
          method: "GET",
          body: null,
        });

        setBooks(apiResponse?.data); // Set the response in state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [books]);

  const updateBook = async (id: number) => {
    Api({ url: `/books/${id}`, method: "PATCH", body: { status } });
    setOpen(false);
    setAlertOpen(true);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const deleteBook = async (id: number) => {
    Api({ url: `/books/${id}`, method: "DELETE", body: null });
    setOpen(false);
    setAlertOpen(true);
  };

  const handleClick = (bookId: number) => {
    if (method === "edit") {
      updateBook(bookId);
    } else {
      deleteBook(bookId);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          severity="success"
          sx={{ position: "fixed", top: "50px", left: "50%" }}
        >
          {method === "edit"
            ? "Book status update success!!!"
            : "Book delete success!!!"}
        </Alert>
      </Snackbar>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {books
          ? books.map((e) => (
              <Card
                sx={{ maxWidth: 300, objectFit: " containt" }}
                key={e.book.id}
              >
                <CardMedia
                  component="img"
                  alt={e.book.title}
                  height="200"
                  image={e.book.cover}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {e.book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {e.book.author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      setOpen(true);
                      setMethod("edit");
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{ color: "red" }}
                    onClick={() => {
                      setOpen(true);
                      setMethod("delete");
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {method === "edit" ? (
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel htmlFor="component-outlined">
                          Status
                        </InputLabel>
                        <OutlinedInput
                          id="component-outlined"
                          value={status}
                          label="Status"
                          required
                          onChange={(e) => setStatus(e.target.value)}
                        />
                      </FormControl>
                    ) : (
                      <Typography variant="h4">Are you sure ?</Typography>
                    )}
                    <Button
                      onClick={() => handleClick(e.book.id)}
                      variant="contained"
                      sx={{ marginTop: "10px" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Modal>
              </Card>
            ))
          : "Not data !!!"}
      </div>
    </Box>
  );
};

export default Content;
