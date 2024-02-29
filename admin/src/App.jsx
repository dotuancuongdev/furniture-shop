import { useContext, useState } from "react";

import "./App.css";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import { AppContext } from "./context";
import { Alert, Button, Snackbar } from "@mui/material";
import Categories from "./pages/Categories";

const AppSnackbar = () => {
  const appContext = useContext(AppContext);
  const { snackbar, setSnackbar } = appContext;
  const { isOpen, message, severity } = snackbar;

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ isOpen: false, message: "", severity: "" });
  };
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

function App() {
  const appContext = useContext(AppContext);
  const { user, snackbar, setSnackbar } = appContext;

  return (
    <>
      <AppSnackbar />
      {user ? <Categories /> : <Login />}
    </>
  );
}

export default App;
