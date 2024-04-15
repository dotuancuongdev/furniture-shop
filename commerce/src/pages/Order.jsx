import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import { AppContext } from "../context";
import { convertDate, formatPrice } from "../helper";
import { useParams } from "react-router-dom";

const Order = () => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;

  const params = useParams();
  const targetId = searchInput || params.id;

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (!targetId) return;
    getOrderDetail();
  }, []);

  const getOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/orders/${targetId}`);
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
      <Box className="flex px-4">
        <Box className="flex gap-3 w-full items-center justify-center flex-1">
          <TextField
            id="outlined-basic"
            label="Your orderId"
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
        {orderDetail && (
          <Box className="w-2/5 mx-auto flex flex-col gap-5 bg-lime-50 rounded-md p-5 flex-[2]">
            <Box className="flex flex-col gap-3">
              <Typography>Name: {orderDetail.name}</Typography>
              <Typography>Phone: {orderDetail.phone}</Typography>
              <Typography>
                Address: {orderDetail.address} - {orderDetail.cityName}
              </Typography>

              <Typography>
                Order Date: {convertDate(orderDetail.createdDate)}
              </Typography>
            </Box>

            <Box>
              <Typography>Products Information:</Typography>
              <Box className="h-[380px] overflow-y-auto pr-3">
                {orderDetail.products.map((item, idx) => (
                  <Box key={idx} className="flex  items-center gap-4 mt-3">
                    <Box className="flex  items-center gap-4">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="w-16 h-16 object-cover rounded-md"
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
      </Box>
      <Box className="bg-[url('https://www.ninjavan.co/static/c14b900522a425a81d1d819a4e3e333b/6109c/Tracking-Desktop.webp')] h-80 "></Box>
    </>
  );
};

export default Order;
