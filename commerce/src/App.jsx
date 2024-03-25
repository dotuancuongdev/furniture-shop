import { useState } from "react";

import "./App.css";
import { Box, Paper, Button, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import Products from "./pages/Products";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";

import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
  ]);
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
