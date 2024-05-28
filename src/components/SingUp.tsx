import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BgIMG from "../assets/background.jpg";
import { ChangeEvent, useState } from "react";
import { useCreateUserMutation } from "../services/users";
import { useNavigate } from "react-router-dom";

export type RegisterProps = {
  name: string;
  email: string;
  key: string;
  secret: string;
};

export default function SingUp() {
  const [register, setRegister] = useState<RegisterProps>({
    name: "",
    email: "",
    key: "",
    secret: "",
  });
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  const inputStyle = {
    width: "50ch",
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("secret", register.secret);
    localStorage.setItem("userKey", register.key);
    try {
      await createUser(register);
      navigate("/books");
    } catch (error) {
      console.log("xatolik yuz berdi");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        padding: "50px 0px",
      }}
    >
      <Grid
        container
        style={{
          borderRadius: "25px",
          boxShadow: "0px 0px 5px #808080",
          height: "100%",
        }}
      >
        <Grid item xs={6} sx={style}>
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Ro'yxatdan o'tish
            </Typography>
            <FormControl sx={inputStyle}>
              <TextField
                id="outlined-basic"
                label="Your name"
                variant="outlined"
                name="name"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={inputStyle}>
              <TextField
                id="outlined-basic"
                label="Your email"
                variant="outlined"
                name="email"
                type="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={inputStyle}>
              <TextField
                id="outlined-basic"
                label="Your key"
                variant="outlined"
                name="key"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={inputStyle}>
              <TextField
                id="outlined-basic"
                label="Your secret"
                variant="outlined"
                name="secret"
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" variant="contained" disabled={isLoading}>
              Jo'natish
            </Button>
          </form>
        </Grid>
        <Grid item xs={6} sx={style}>
          <img
            src={BgIMG}
            alt="background-image"
            style={{ height: "50%", objectFit: "contain" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
