import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Container,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FormProps {
  name: string;
  type: string;
  value: string;
}

interface User {
  email: string;
  name: string;
  key: string;
  secret: string;
}

const FormComponents: FormProps[] = [
  { name: "email", type: "email", value: "" },
  { name: "name", type: "text", value: "" },
  { name: "key", type: "password", value: "" },
  { name: "secret", type: "password", value: "" },
];

const Signup = () => {
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    key: "",
    secret: "",
  });

  const navigate = useNavigate();

  const addUser = async () => {
    try {
      const response = await fetch("https://no23.lavina.tech/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      localStorage.setItem("key", data.data.key);
      localStorage.setItem("secret", data.data.secret);
      if (response.ok === true) {
        <Alert severity="success">Signup successfull!!!</Alert>;
        navigate("dashboard");
      } else {
        <Alert severity="error">You entered incorrect information</Alert>;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: "2px solid blue",
          padding: "50px 100px",
        }}
        noValidate
        autoComplete="on"
      >
        <Typography variant="h4">Sign Up</Typography>
        {FormComponents.map((value, index) => (
          <FormControl variant="standard" key={index}>
            <InputLabel
              sx={{ textTransform: "capitalize" }}
              htmlFor={`component-simple-${index}`}
            >
              {value.name}
            </InputLabel>
            <Input
              name={value.name}
              id={`component-simple-${index}`}
              value={user[value.name as keyof User]}
              type={value.type}
              required
              onChange={(e) =>
                setUser({ ...user, [value.name]: e.target.value })
              }
            />
          </FormControl>
        ))}

        <Button onClick={addUser} variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
