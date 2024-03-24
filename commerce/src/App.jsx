import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box, Paper, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import Products from "./pages/Products";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";

var carousels = [
  {
    url: "../public/slideshow_1_master.jpg",
  },
  {
    url: "../public/slideshow_2.jpg",
  },
  {
    url: "../public/slideshow_3.jpg",
  },
  {
    url: "../public/slideshow_4.jpg",
  },
  {
    url: "../public/slideshow_5.jpg",
  },
];

function App() {
  const [count, setCount] = useState(0);
  function Item(props) {
    return (
      <Paper>
        <img src={props.item.url} alt="" className="w-full h-auto" />
      </Paper>
    );
  }

  return (
    <>
      <Carousel animation="slide" duration={550}>
        {carousels.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
}

export default App;
