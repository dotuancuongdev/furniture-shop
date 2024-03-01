import { useContext, useState } from "react";

import "./App.css";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import { AppContext } from "./context";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
} from "@mui/material";
import Categories from "./pages/Categories";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const admin = createBrowserRouter([
  { path: "/", element: <Admin /> },
  { path: "/category", element: <Categories /> },
  { path: "/*", element: <Navigate to="/" replace /> },
]);
const auth = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/*", element: <Navigate to="/" replace /> },
]);

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

const AppLoading = () => {
  const { loading } = useContext(AppContext);
  return (
    <Box
      className={`flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-zinc-900 opacity-80 z-[9999] ${
        !loading ? "hidden" : ""
      }`}
    >
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="secondary" className="text-green-400" />
      </Stack>
    </Box>
  );
};

function App() {
  const appContext = useContext(AppContext);
  const { user } = appContext;

  return (
    <>
      <AppLoading />
      <AppSnackbar />
      <RouterProvider router={user ? admin : auth} />
    </>
  );
}

export default App;
