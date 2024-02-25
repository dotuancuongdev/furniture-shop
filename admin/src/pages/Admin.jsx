import { Button } from "@mui/material";
import React, { useContext } from "react";
import { appContext } from "../context";

const Admin = () => {
  const userContext = useContext(appContext);
  const { setUser } = userContext;
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };
  return (
    <>
      <Button variant="contained" onClick={handleLogout}>
        logout
      </Button>
    </>
  );
};

export default Admin;
