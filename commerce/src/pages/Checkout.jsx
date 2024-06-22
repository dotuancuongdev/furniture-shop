import React, { forwardRef, useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import {
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import MenuItem from "@mui/material/MenuItem";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { formatPrice } from "../helper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api";
import { CART } from "../constants";
import { useNavigate } from "react-router-dom";

// const regexVietnamPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const schema = yup
  .object({
    name: yup.string().required(),
    phone: yup.number().typeError("Error Phone Number").required(),
    email: yup.string().email(),
    address: yup.string().required(),
    cityId: yup.string().required(),
  })
  .required();

const Checkout = () => {
  const [cities, setCities] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [valueCheckDialog, setValueCheckDialog] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const appContext = useContext(AppContext);
  const { cart, setLoading, setSnackbar, setCart } = appContext;

  const totalPrice = cart.reduce((x, y) => {
    return x + y.price * y.quantity;
  }, 0);
  const navigate = useNavigate();

  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    const values = getValues();

    const productsWithQuantity = cart.map((item) => {
      return { productId: item._id, quantity: item.quantity };
    });

    const payload = {
      ...values,
      productsWithQuantity: productsWithQuantity,
    };

    const createNewOrder = async () => {
      setLoading(true);
      try {
        await api.post(`/orders`, payload);
        setSnackbar({
          isOpen: true,
          message: "Order successfully placed",
          severity: "success",
        });
        localStorage.removeItem(CART);
        setCart([]);
        navigate(`/`);

        setLoading(false);
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.response?.data?.message || error.message,
          severity: "error",
        });
        setLoading(false);
      }
    };

    createNewOrder();
  };

  const handleDecrease = (id) => {
    const foundPrd = cart.find((item) => item._id === id);
    if (!foundPrd) return;
    if (foundPrd.quantity < 2) return;
    const updateCart = cart.map((item) => {
      if (item._id === foundPrd._id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updateCart);
  };

  const handleIncrease = (id) => {
    const foundPrd = cart.find((item) => item._id === id);
    if (!foundPrd) return;

    const updateCart = cart.map((item) => {
      if (item._id === foundPrd._id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updateCart);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Do you want to delete this item?");
    if (confirmDelete) {
      const updateCart = cart.filter((item) => {
        return item._id !== id;
      });
      setCart(updateCart);
    }
  };

  useEffect(() => {
    if (cart.length === 0) return;
    let ignore = false;
    const getCities = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/cities`);
        if (!ignore) {
          setCities(res.data);
        }
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

    getCities();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Box className="mx-5 xl:mx-48 ">
        <Typography variant="h4" className="text-center text-[#003872]">
          Checkout
        </Typography>
        {cart.length === 0 ? (
          <Typography className="text-center mt-7">
            There are no items in your cart.{" "}
            <span
              className="text-zinc-400 italic cursor-pointer hover:text-black"
              onClick={() => {
                navigate(`/product`);
              }}
            >
              {`Continue Shopping >`}{" "}
            </span>
          </Typography>
        ) : (
          <>
            <Box className="xl:flex gap-3">
              <Box className="xl:flex-[2] ">
                <Typography variant="h4" className="text-center text-[#003872]">
                  Shopping Cart
                </Typography>
                <Divider />

                <Box className="xl:h-[500px] xl:overflow-y-auto">
                  {cart.map((item, idx) => (
                    <Box
                      key={idx}
                      className="mt-5 xl:flex gap-4 items-center xl:mr-2"
                    >
                      <Box className="xl:flex items-center gap-4 xl:flex-1">
                        <Box className="flex items-center gap-12 xl:gap-2">
                          <Typography
                            className="  bg-zinc-50-200 px-2 py-1 hidden xl:block text-center cursor-pointer"
                            onClick={() => handleDelete(item._id)}
                          >
                            <DeleteSweepIcon className="text-red-500 hover:text-red-600 text-3xl" />
                          </Typography>
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-36 mb-2"
                          />
                          <Typography
                            className="text-red-500 bg-zinc-50-200 px-2 py-1 rounded-sm xl:hidden cursor-pointer"
                            onClick={() => handleDelete(item._id)}
                          >
                            Remove Item
                          </Typography>
                        </Box>
                        <Typography
                          className="mb-4 text-[#9f9f9f] hover:text-black cursor-pointer "
                          onClick={() => navigate(`/product/${item._id}`)}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                      <Typography className="mb-4">
                        {formatPrice(item.price * item.quantity)}
                      </Typography>
                      <Box className="w-1/2 flex justify-center items-center border border-solid border-zinc-200 rounded-sm mb-6 xl:flex xl:w-1/4">
                        <button
                          onClick={() => handleDecrease(item._id)}
                          className="cursor-pointer w-12 h-12 px-3 border-none bg-white hover:bg-zinc-200 xl:flex-1 "
                        >
                          <RemoveIcon className="xl:text-base" />
                        </button>

                        <Typography className="flex-1 text-lg text-center xl:text-base">
                          {item.quantity}
                        </Typography>

                        <button
                          onClick={() => handleIncrease(item._id)}
                          className="cursor-pointer w-12 h-12 px-3 border-none bg-white hover:bg-zinc-200 xl:flex-1"
                        >
                          <AddIcon className="xl:text-base" />
                        </button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="mb-12 mt-12 xl:flex-1 xl:mt-0  xl:px-4">
                <Typography variant="h4" className="text-center text-[#003872]">
                  Customer Infomation
                </Typography>
                <Divider />
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col mt-5"
                >
                  <Box>
                    <TextField
                      id="outlined-basic"
                      label="Full Name"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      {...register("name")}
                    />

                    <Typography
                      className={
                        errors.name?.message ? "text-red-500" : "text-white"
                      }
                    >
                      {errors.name?.message || "a"}
                    </Typography>
                  </Box>

                  <Box>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      {...register("email")}
                    />
                    <Typography className="text-white">-</Typography>
                  </Box>
                  <Box className="flex gap-2">
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Phone Number"
                        variant="outlined"
                        size="small"
                        type="number"
                        className="w-full"
                        {...register("phone")}
                      />
                      <Typography
                        className={
                          errors.phone?.message ? "text-red-500" : "text-white"
                        }
                      >
                        {errors.phone?.message || "a"}
                      </Typography>
                    </Box>
                    <FormControl fullWidth size="small" className="flex-1">
                      <InputLabel>City</InputLabel>
                      <Controller
                        name="cityId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Select {...field}>
                            {cities.map((item, idx) => (
                              <MenuItem key={idx} value={item._id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Box>

                  <Box>
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      {...register("address")}
                    />
                    <Typography
                      className={
                        errors.address?.message ? "text-red-500" : "text-white"
                      }
                    >
                      {errors.address?.message || "a"}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    className="bg-[#FFEBBB] text-black"
                    type="submit"
                  >
                    checkout
                  </Button>
                </form>
              </Box>
            </Box>
            <Box className="mt-5">
              <Divider className="bg-zinc-400" />
              <Typography variant="h6" className="text-end py-3">
                Total Price: {formatPrice(totalPrice)}
              </Typography>
              <Divider className="bg-zinc-400" />
            </Box>
          </>
        )}
      </Box>
    </>
  );

  return (
    <Box className="flex  max-w-7xl mx-auto">
      <Box className="flex-[2] px-5 ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <Box>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              size="small"
              className="w-full"
              {...register("name")}
            />

            <Typography
              className={errors.name?.message ? "text-red-500" : "text-white"}
            >
              {errors.name?.message || "a"}
            </Typography>
          </Box>

          <Box>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              className="w-full"
              {...register("email")}
            />
            <Typography className="text-white">-</Typography>
          </Box>
          <Box className="flex gap-2">
            <Box>
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                size="small"
                type="number"
                className="w-full"
                {...register("phone")}
              />
              <Typography
                className={
                  errors.phone?.message ? "text-red-500" : "text-white"
                }
              >
                {errors.phone?.message || "a"}
              </Typography>
            </Box>
            <FormControl fullWidth size="small" className="flex-1">
              <InputLabel>City</InputLabel>
              <Controller
                name="cityId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field}>
                    {cities.map((item, idx) => (
                      <MenuItem key={idx} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <Box>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              size="small"
              className="w-full"
              {...register("address")}
            />
            <Typography
              className={
                errors.address?.message ? "text-red-500" : "text-white"
              }
            >
              {errors.address?.message || "a"}
            </Typography>
          </Box>

          <Button variant="contained" className="bg-purple-600" type="submit">
            thanh toán
          </Button>
        </form>
      </Box>

      <Box className="flex-[3] bg-zinc-100 p-5">
        {cart.length === 0 ? (
          <Typography className="text-center text-xl">Empty Cart</Typography>
        ) : (
          <>
            <Box className="h-[500px] overflow-auto">
              {cart.map((item, idx) => (
                <Box key={idx} className="flex items-center  mt-4 mb-2">
                  <Box className="flex justify-center items-center gap-4 flex-[3] ">
                    <Box
                      className=" p-2  cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteSweepIcon className="text-red-500" />
                    </Box>
                    <Box className="flex-1 flex items-center gap-3">
                      <Badge badgeContent={item.quantity} color="success">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-16 h-16"
                        />
                      </Badge>
                      <Typography>{item.name}</Typography>
                    </Box>
                  </Box>
                  <Box className="flex gap-3 mx-2 flex-1">
                    <Box
                      onClick={() => handleDecrease(item._id)}
                      className="cursor-pointer"
                    >
                      <RemoveIcon />
                    </Box>
                    <Typography> {item.quantity}</Typography>
                    <Box
                      onClick={() => handleIncrease(item._id)}
                      className="cursor-pointer"
                    >
                      <AddIcon />
                    </Box>
                    <Typography>
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider />
            <Box className="flex justify-end pt-2">
              <Typography variant="h6">
                Total Price: {formatPrice(totalPrice)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Checkout;
