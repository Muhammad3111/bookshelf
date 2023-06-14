import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar />
      <Content />
    </Box>
  );
};

export default Dashboard;
