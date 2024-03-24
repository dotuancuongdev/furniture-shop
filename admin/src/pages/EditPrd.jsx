import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context";
import api from "../api";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number(),
    stock: yup.number(),
    summary: yup.string(),
    description: yup.string(),
    thumnail: yup.string(),
    image: yup.array(),
  })
  .required();

const EditPrd = () => {
  // const [detail, setDetail] = useState(null);
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;
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
        // setDetail(response.data);
        console.log(response.data);
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

  return (
    <>
      <Box>
        <form>
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
              {errors.name && (
                <Typography className="text-red-500">
                  {errors.name.message}
                </Typography>
              )}
            </Box>

            <Box className="flex-1  ">
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                size="small"
                className={`${errors.name ? "" : "mb-6"} w-full`}
                {...register("price")}
              />
              {errors.name && (
                <Typography className="text-red-500">
                  {errors.name.message}
                </Typography>
              )}
            </Box>
            <Box className="flex-1  ">
              <TextField
                id="outlined-basic"
                label="Stock"
                variant="outlined"
                size="small"
                className={`${errors.name ? "" : "mb-6"} w-full`}
                {...register("stock")}
              />
              {errors.name && (
                <Typography className="text-red-500">
                  {errors.name.message}
                </Typography>
              )}
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
              {errors.name && (
                <Typography className="text-red-500">
                  {errors.name.message}
                </Typography>
              )}
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
              {errors.name && (
                <Typography className="text-red-500">
                  {errors.name.message}
                </Typography>
              )}
            </Box>
          </Box>

          <Button
            variant="contained"
            className="bg-green-500"
            onClick={handleUpdate}
          >
            update
          </Button>
        </form>
      </Box>
    </>
  );
};

export default EditPrd;
