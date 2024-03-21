import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../context";

const Admin = () => {
  const userContext = useContext(AppContext);
  const { setUser } = userContext;
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };
  return <Box>admin home page</Box>;
};

export default Admin;
