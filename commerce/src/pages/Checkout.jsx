import React, { useContext, useEffect, useState } from "react";
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
import MenuItem from "@mui/material/MenuItem";

import { formatPrice } from "../helper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api";

// const regexVietnamPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const schema = yup
  .object({
    name: yup.string().required(),
    phone: yup.number().required("Error Phone Number"),
    email: yup.string().email().required(),
    address: yup.string().required(),
    cityId: yup.string().required(),
    district: yup.string().required(),
    ward: yup.string().required(),
  })
  .required();

const Checkout = () => {
  const [cities, setCities] = useState([]);

  const appContext = useContext(AppContext);
  const { cart, setLoading, setSnackbar } = appContext;
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = () => {
    const values = getValues();
    const foundAddress = cities.find((item) => item._id === values.cityId);
    const nameAdd = foundAddress.name;

    const productsWithQuantity = cart.map((item) => {
      return { productId: item._id, quantity: item.quantity };
    });
    console.log(productsWithQuantity);

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: nameAdd,
      cityId: values.cityId,
      productsWithQuantity: productsWithQuantity,
    };
    console.log(payload);
    const createNewOrder = async () => {
      setLoading(true);
      try {
        await api.post(`/orders`, payload);
        setSnackbar({
          isOpen: true,
          message: "Success",
          severity: "success",
        });
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
    createNewOrder();
  };

  useEffect(() => {
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
      }
    };
    getCities();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <Box className="flex h-screen max-w-7xl mx-auto">
      <Box className="flex-1 p-5 ">
        <form className="flex flex-col gap-5">
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
              className={`${
                errors.name?.message ? "text-red-500" : "hidden h-6"
              } `}
            >
              {errors.name?.message}
            </Typography>
          </Box>

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
            <Typography className={`text-red-500 `}>
              {errors.phone?.message}
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
            <Typography
              className={`${errors ? "text-red-500" : "hidden mt-5"}`}
            >
              {errors.email?.message}
            </Typography>
          </Box>
          <Box className="flex">
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
            <Box className="flex-1">
              <TextField
                id="outlined-basic"
                label="District"
                variant="outlined"
                size="small"
                {...register("district")}
              />
              <Typography
                className={`${
                  errors.district?.message ? "text-red-500" : "hidden h-6"
                } `}
              >
                {errors.district?.message}
              </Typography>
            </Box>
            <Box className="flex-1">
              <TextField
                id="outlined-basic"
                label="Ward"
                variant="outlined"
                size="small"
                {...register("ward")}
              />
              <Typography
                className={`${
                  errors.ward?.message ? "text-red-500" : "hidden h-6"
                } `}
              >
                {errors.district?.message}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            className="bg-purple-400"
            onClick={onSubmit}
          >
            thanh toán
          </Button>
        </form>
      </Box>

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
