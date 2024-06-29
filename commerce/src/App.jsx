import { useContext, useEffect } from "react";

import { Alert, Box, CircularProgress, Snackbar, Stack } from "@mui/material";
import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { AppContext } from "./context";
import Checkout from "./pages/Checkout";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Products from "./pages/Products";

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
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          backgroundColor: "#ffebbb",
          color: "black",
          border: "1px solid black",
        }}
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
    path: "/order-tracking/:id?",
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
      <ScrollToTop />
      <AppLoading />
      <AppSnackbar />
      <Header />
      <Navbar />
      <Box className="">
        <Routes>
          {routers.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
