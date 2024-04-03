import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import { AppContext } from "../context";
import { Box, Button, TextField, Typography } from "@mui/material";
import { formatPrice } from "../helper";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Detail = () => {
  const params = useParams();
  const [detail, setDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityString, setQuantityString] = useState(`${quantity}`);
  const [imgIdx, setImgIdx] = useState(0);
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, cart, setCart } = appContext;

  useEffect(() => {
    let ignore = false;
    const getDetail = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/commerce/${params.id}`);
        // console.log(res.data);

        if (!ignore) {
          setDetail(res.data);

          setLoading(false);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
        setLoading(false);
      }
    };
    getDetail();
    return () => {
      ignore = true;
    };
  }, []);

  const handleChangeNumberInput = (e) => {
    setQuantityString(e.target.value);
    setQuantity(parseInt(e.target.value));
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
    setQuantityString(`${quantity + 1}`);
  };
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
    setQuantityString(`${quantity - 1}`);
  };
  const handleChangeImgIdx = (idx) => {
    setImgIdx(idx);
  };

  const handleAddToCart = () => {
    const foundProduct = cart.find((p) => p._id === detail._id);
    if (foundProduct) {
      const updateProducts = cart.map((prd) => {
        if (prd._id === foundProduct._id) {
          return { ...prd, quantity: prd.quantity + quantity };
        }
        return prd;
      });
      setCart(updateProducts);
      setSnackbar({
        isOpen: true,
        message: "Success",
        severity: "success",
      });
      return;
    }

    const newPrd = { ...detail, quantity: quantity };
    setCart([...cart, newPrd]);
    setSnackbar({
      isOpen: true,
      message: "Success",
      severity: "success",
    });
  };
  return (
    <Box className="max-w-5xl mx-auto">
      {!detail ? null : (
        <>
          <Box className="flex justify-center">
            <Box className="flex-[6] flex gap-3">
              <Box className="flex-1 flex flex-col gap-2 h-[450px] overflow-y-scroll">
                <Box>
                  {detail.images.map((img, idx) => (
                    <Box
                      key={idx}
                      className=""
                      onClick={() => handleChangeImgIdx(idx)}
                    >
                      <img
                        src={img}
                        alt=""
                        className="object-cover cursor-pointer w-full"
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="flex-[4]">
                <img src={detail.images[imgIdx]} alt="" className="w-full " />
              </Box>
            </Box>
            <Box className="flex-[4] pl-5 flex flex-col gap-6">
              <Typography variant="h6" className="font-semibold">
                {detail.name}
              </Typography>
              <Box>
                {detail.price === detail.originalPrice ? (
                  <Typography className="text-orange-500 text-lg font-semibold">
                    {formatPrice(detail.price)}
                  </Typography>
                ) : (
                  <Box className="flex gap-4 items-center">
                    <Box className="bg-zinc-200">
                      <Typography className="px-2 py-[2px] text-red-500 font-semibold">
                        -
                        {Math.floor(
                          (1 - detail.price / detail.originalPrice) * 100
                        )}
                        %
                      </Typography>
                    </Box>
                    <Typography className="text-orange-500 text-lg font-semibold">
                      {formatPrice(detail.price)}
                    </Typography>
                    <Typography className="text-zinc-400 line-through ">
                      {formatPrice(detail.originalPrice)}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box className="flex flex-col gap-2">
                <Box className=" flex gap-2 h-9">
                  <Button
                    variant="contained"
                    className="bg-zinc-400"
                    onClick={handleDecrease}
                    disabled={quantity === 1}
                  >
                    <RemoveIcon />
                  </Button>

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    type="number"
                    className="h-2 w-16"
                    value={quantity}
                    onChange={handleChangeNumberInput}
                  />
                  <Button
                    variant="contained"
                    className="bg-zinc-400"
                    onClick={handleIncrease}
                  >
                    <AddIcon />
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  className="  bg-orange-500 "
                  onClick={handleAddToCart}
                >
                  thêm vào giỏ
                </Button>
              </Box>
              <Box className="max-h-48 overflow-y-auto">
                <div
                  className="text-lg"
                  dangerouslySetInnerHTML={{ __html: detail.summary }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="flex justify-center border border-solid p-4 rounded-sm">
            <div
              className="abc"
              // className="w-full"
              dangerouslySetInnerHTML={{ __html: detail.description }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Detail;
