import { useContext, useState } from "react";

import "./App.css";
import {
  Box,
  Paper,
  Button,
  Typography,
  Snackbar,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

import Products from "./pages/Products";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";

import Home from "./pages/Home";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppContext } from "./context";

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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/product",
      element: <Products />,
    },

    {
      path: "/checkout",
      element: <Checkout />,
    },
    { path: "/*", element: <Navigate to="/" replace /> },
  ]);
  return (
    <>
      <AppLoading />
      <AppSnackbar />
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
