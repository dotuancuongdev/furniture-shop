import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../context";

const Admin = () => {
  const appContext = useContext(AppContext);
  const { setHeader } = appContext;
  setHeader("Admin Home Page");

  return <Box>admin </Box>;
};

export default Admin;
