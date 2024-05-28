import { Button, Container, Typography } from "@mui/material";
import { useGetUserQuery } from "../services/users";
import { useState } from "react";
import AddBooks from "./AddBooks";
import CryptoJS from "crypto-js";

export default function TopHeader() {
  const [open, setOpen] = useState<boolean>(false);
  const generateSign = () => {
    const Key = localStorage.getItem("userKey") as string;
    const url = "/myself";
    const method = "GET";
    const body = "";
    const secret = localStorage.getItem("secret");
    const Sign = CryptoJS.MD5(`${method}${url}${body}${secret}`).toString();
    return { Key, Sign };
  };
  const { data, error } = useGetUserQuery(generateSign());
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 0px",
      }}
    >
      <div>
        <Button onClick={() => handleOpen()} variant="contained">
          Create New Book
        </Button>
        {open && <AddBooks open={open} handleClose={handleClose} />}
      </div>
      <div>
        <Typography variant="h4">
          {error ? "Xatolik yuzberid" : data?.data.name}
        </Typography>
      </div>
    </Container>
  );
}
