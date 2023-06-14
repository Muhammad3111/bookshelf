import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import Api from "../api/Api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid blue",
  boxShadow: 24,
  p: 4,
};

const Sidebar = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [isbn, setIsbn] = useState<string>("");

  const addBook = () => {
    Api({ url: "/books", method: "POST", body: { isbn } });
    setAlertOpen(true);
    setModalOpen(false);
    setIsbn("");
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

  return (
    <div
      style={{
        width: "280px",
        borderRight: "2px solid gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        padding: "20px 0px",
      }}
    >
      <div>
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert
            severity="success"
            sx={{ position: "fixed", top: "50px", left: "50%" }}
          >
            New Book addded success!!!
          </Alert>
        </Snackbar>
        <Button onClick={handleOpen} variant="outlined">
          Add new book
        </Button>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="component-outlined">Book Id</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={isbn}
                label="Book Id"
                required
                onChange={(e) => setIsbn(e.target.value)}
              />
            </FormControl>
            <Button
              onClick={addBook}
              variant="contained"
              sx={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
