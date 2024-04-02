import React, { useContext } from "react";
import { AppContext } from "../context";
import { Badge, Box, Divider, Typography } from "@mui/material";
import { formatPrice } from "../helper";

const Checkout = () => {
  const appContext = useContext(AppContext);
  const { cart } = appContext;
  return (
    <Box className="flex h-screen max-w-7xl mx-auto">
      <Box className="flex-1">infomation</Box>
      {cart.length === 0 ? (
        <Box className="flex-1 bg-zinc-100 p-5">
          <Typography className="text-center text-xl">Empty Cart</Typography>
        </Box>
      ) : (
        <Box className="flex-1 bg-zinc-100 p-5">
          <Box className="h-[500px] overflow-auto">
            {cart.map((item, idx) => (
              <Box key={idx} className="flex gap-5 mt-4 mb-2">
                <Box className="flex justify-center items-center gap-4">
                  <Badge badgeContent={item.quantity} color="success">
                    <img src={item.thumbnail} alt="" className="w-16 h-16" />
                  </Badge>
                  <Typography>{item.name}</Typography>
                </Box>

                {/* <Typography>{formatPrice(item.price)}</Typography> */}
                <Box className="flex w-full justify-end items-center flex-1">
                  <Typography>
                    {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Divider />
        </Box>
      )}
    </Box>
  );
};

export default Checkout;
