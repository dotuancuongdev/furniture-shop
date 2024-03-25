import React from "react";
import { useState } from "react";

import { Box, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const slideShowImgs = [
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_3.jpg?v=272",
  },
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_7.jpg?v=272",
  },
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_1_master.jpg?v=272",
  },
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_4.jpg?v=272",
  },
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_6.jpg?v=272",
  },
];

const Home = () => {
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
        {slideShowImgs.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <Box className="max-w-6xl my-0 mx-auto">
        <Typography variant="h4" className="my-5 font-mono">
          Không gian Sống
        </Typography>
        <Box className="flex justify-center w-full h-auto">
          <Box className="w-full h-full flex gap-4">
            <Box className="flex-1  flex flex-col gap-4 ">
              <img
                src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView1.jpg?v=272"
                alt=""
                className="w-full h-full cursor-pointer  opacity-90 hover:opacity-100 duration-100"
              />
              <img
                src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView2.jpg?v=272"
                alt=""
                className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
              />
            </Box>
            <Box className="flex-[2] flex flex-col gap-4 ">
              <Box className="flex-[6]  cursor-pointer ">
                <img
                  src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView3.jpg?v=272"
                  alt=""
                  className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                />
              </Box>
              <Box className="flex-[4] flex gap-4">
                <Box className="flex-1 ">
                  <img
                    src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView4.jpg?v=272"
                    alt=""
                    className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                  />
                </Box>
                <Box className="flex-1 ">
                  <img
                    src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView5.jpg?v=272"
                    alt=""
                    className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
