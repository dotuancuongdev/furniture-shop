import { useContext } from "react";

import { Alert, Box, CircularProgress, Snackbar, Stack } from "@mui/material";
import "./App.css";

import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AppContext } from "./context";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Order from "./pages/Order";

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

const routers = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/product",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <Detail />,
  },
  {
    path: "/product/:id",
    element: <Detail />,
  },
  {
    path: "/order-tracking",
    element: <Order />,
  },

  {
    path: "/checkout",
    element: <Checkout />,
  },
  { path: "/*", element: <Navigate to="/" replace /> },
];

function App() {
  return (
    <BrowserRouter>
      <AppLoading />
      <AppSnackbar />
      <Header />
      <Routes>
        {routers.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
