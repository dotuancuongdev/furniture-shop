import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import api from "../api";
import { formatPrice } from "../helper";

const Order = () => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const getOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/orders/${searchInput}`);
      console.log(res.data);
      setOrderDetail(res.data);
      setLoading(false);
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: error.message,
        severity: "error",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Box className="flex gap-3 w-full items-center justify-center">
        <TextField
          id="outlined-basic"
          label="Your id"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={handleChangeSearchInput}
        />
        <Button
          variant="contained"
          className="bg-red-500 rounded-full"
          onClick={getOrderDetail}
        >
          search
        </Button>
      </Box>
      <img
        src="https://www.ninjavan.co/static/c14b900522a425a81d1d819a4e3e333b/6109c/Tracking-Desktop.webp"
        alt=""
      />
      {!orderDetail ? (
        <></>
      ) : (
        <Box className="w-2/5 mx-auto flex flex-col gap-5 bg-amber-50 p-5">
          <Box className="flex flex-col gap-3">
            <Typography>Order Name: {orderDetail.name}</Typography>
            <Typography>Order Phone: {orderDetail.phone}</Typography>
            <Typography>
              Order Create date: {orderDetail.createdDate}
            </Typography>
          </Box>

          <Box>
            <Typography>Products Information:</Typography>
            <Box className="h-[500px] overflow-y-auto">
              {orderDetail.products.map((item, idx) => (
                <Box key={idx} className="flex  items-center gap-4 mt-3">
                  <Box className="flex  items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-16 h-16 object-cover"
                    />
                    <Typography>{item.name}</Typography>
                  </Box>
                  <Box className="flex flex-1 justify-end">
                    <Typography>{formatPrice(item.price)}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Order;
