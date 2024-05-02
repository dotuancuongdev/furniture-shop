import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context";
import api from "../api";
import { Box, Button, TextField, Typography } from "@mui/material";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import DoneIcon from "@mui/icons-material/Done";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Done from "@mui/icons-material/Done";

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().required(),
    summary: yup.string(),
    description: yup.string(),
    thumnail: yup.string(),
    image: yup.array(),
  })
  .required();

const EditPrd = () => {
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, setHeader } = appContext;

  const product = useParams();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleUpdate = () => {
    const values = getValues();
    console.log(values);
  };

  useEffect(() => {
    let ignore = false;
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${product.id}`);
        reset(response.data);
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

    getProduct();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setHeader("Update Product");
  }, []);

  return (
    <>
      <form>
        <Box className="flex justify-end mb-4">
          <Button
            variant="contained"
            className="bg-green-500"
            onClick={handleUpdate}
          >
            <Done />
          </Button>
        </Box>

        <Box className="flex gap-5">
          <Box className="  flex-1">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              className={`${errors.name ? "" : "mb-6"} w-full`}
              {...register("name")}
            />
            <Typography
              className={errors.name?.message ? "text-red-500" : "text-white"}
            >
              {errors.name?.message || "a"}
            </Typography>
          </Box>

          <Box className="flex-1  ">
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              size="small"
              className={`${errors.price ? "" : "mb-6"} w-full`}
              {...register("price")}
            />
            <Typography
              className={errors.price?.message ? "text-red-500" : "text-white"}
            >
              {errors.price?.message || "a"}
            </Typography>
          </Box>
          <Box className="flex-1  ">
            <TextField
              id="outlined-basic"
              label="Stock"
              variant="outlined"
              size="small"
              className={`${errors.stock ? "" : "mb-6"} w-full`}
              {...register("stock")}
            />
            <Typography
              className={errors.stock?.message ? "text-red-500" : "text-white"}
            >
              {errors.stock?.message || "a"}
            </Typography>
          </Box>
        </Box>
        <Box className="flex gap-5">
          <Box className="flex-1  ">
            <TextField
              id="outlined-basic"
              label="Summary"
              variant="outlined"
              size="small"
              multiline
              rows={2}
              className={`${errors.name ? "" : "mb-6"} w-full`}
              {...register("summary")}
            />
          </Box>
          <Box className="flex-1  ">
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              size="small"
              multiline
              rows={2}
              className={`${errors.name ? "" : "mb-6"} w-full`}
              {...register("description")}
            />
          </Box>
        </Box>
      </form>
    </>
  );
};

export default EditPrd;
