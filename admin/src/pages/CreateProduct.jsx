import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AppContext } from "../context";
import api from "../api";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().required(),
    summary: yup.string(),
    description: yup.string(),
    thumbnail: yup.string(),
    images: yup.array(),
    categoryIds: yup.array(),
  })
  .required();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(category, categories, theme) {
  return {
    fontWeight:
      categories.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;
  const {
    control,
    getValues,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryIds: [],
    },
  });

  const onSubmit = (data) => {
    const postProduct = async () => {
      setLoading(true);
      try {
        await api.post(`/products`, data);
        setSnackbar({
          isOpen: true,
          message: "Success",
          severity: "success",
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setSnackbar({
          isOpen: true,
          message: error.response?.data?.message || error.message,
          severity: "error",
        });
        setLoading(false);
      }
    };
    postProduct();
  };

  const handleChangeCategory = (event) => {
    console.log(event.target);

    setValue("categoryIds", event.target.value);
  };
  const selectedCategoryValues = watch("categoryIds", []);

  useEffect(() => {
    let ignore = false;
    const getCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/categories/all`);
        setCategories(res.data);
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
    getCategories();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          className={`${errors.name ? "" : "mb-6"}`}
          {...register("name")}
        />
        {errors.name && (
          <Typography className="text-red-500">
            {errors.name.message}
          </Typography>
        )}
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type="number"
          size="small"
          className={`${errors.price ? "" : "mb-6"}`}
          {...register("price")}
        />
        {errors.price && (
          <Typography className="text-red-500">
            {errors.price.message}
          </Typography>
        )}
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="Stock"
          variant="outlined"
          type="number"
          size="small"
          className={`${errors.stock ? "" : "mb-6"}`}
          {...register("stock")}
        />
        {errors.stock && (
          <Typography className="text-red-500">
            {errors.stock.message}
          </Typography>
        )}
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="Summary"
          variant="outlined"
          size="small"
          className={`${errors.summary ? "" : "mb-6"}`}
          {...register("summary")}
        />
        {errors.summary && (
          <Typography className="text-red-500">
            {errors.summary.message}
          </Typography>
        )}
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          size="small"
          className={`${errors.description ? "" : "mb-6"}`}
          multiline
          rows={2}
          {...register("description")}
        />
        {errors.description && (
          <Typography className="text-red-500">
            {errors.description.message}
          </Typography>
        )}
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="Thumbnail"
          variant="outlined"
          size="small"
          className={`${errors.thumbnail ? "" : "mb-6"}`}
          {...register("thumbnail")}
        />
        {errors.thumbnail && (
          <Typography className="text-red-500">
            {errors.thumbnail.message}
          </Typography>
        )}
      </Box>
      <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Category</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            size="small"
            input={<OutlinedInput label="Categories" />}
            MenuProps={MenuProps}
            {...register("categoryIds")}
            value={selectedCategoryValues}
            onChange={handleChangeCategory}
          >
            {categories.map((category) => (
              <MenuItem
                key={category._id}
                value={category._id}
                style={getStyles(category, categories, theme)}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button type="submit" variant="contained" className="bg-green-500">
        create product
      </Button>
    </form>
  );
};

export default CreateProduct;
