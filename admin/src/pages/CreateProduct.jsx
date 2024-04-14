import { yupResolver } from "@hookform/resolvers/yup";
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
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../api";
import { AppContext } from "../context";

const TINYMCE_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().required(),
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
  const editorDescriptionRef = useRef(null);
  const editorSummaryRef = useRef(null);

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
    const formValues = {
      ...data,
      summary: editorSummaryRef.current.getContent(),
      description: editorDescriptionRef.current.getContent(),
    };

    const postProduct = async () => {
      setLoading(true);
      try {
        await api.post(`/products`, formValues);
        setSnackbar({
          isOpen: true,
          message: "Success",
          severity: "success",
        });
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

    postProduct();
  };

  const handleChangeCategory = (event) => {
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
          className={`${errors.name ? "" : "mb-6"} w-full`}
          {...register("name")}
        />
        {errors.name && (
          <Typography className="text-red-500">
            {errors.name.message}
          </Typography>
        )}
      </Box>

      <Box className="flex gap-2">
        <Box className="flex-1">
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="number"
            size="small"
            className={`${errors.price ? "" : "mb-6"} w-full`}
            {...register("price")}
          />
          {errors.price && (
            <Typography className="text-red-500">
              {errors.price.message}
            </Typography>
          )}
        </Box>
        <Box className="flex-1">
          <TextField
            id="outlined-basic"
            label="Stock"
            variant="outlined"
            type="number"
            size="small"
            className={`${errors.stock ? "" : "mb-6"} w-full`}
            {...register("stock")}
          />
          {errors.stock && (
            <Typography className="text-red-500">
              {errors.stock.message}
            </Typography>
          )}
        </Box>
        <Box className="flex-[2]">
          <FormControl className="w-full ">
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
      </Box>

      <Box>
        <Typography variant="h6">Summary</Typography>
        <Editor
          apiKey={TINYMCE_KEY}
          onInit={(evt, editor) => (editorSummaryRef.current = editor)}
          initialValue=""
          init={{
            height: 240,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Box>

      <br />

      <Box>
        <Typography variant="h6">Description</Typography>
        <Editor
          apiKey={TINYMCE_KEY}
          onInit={(evt, editor) => (editorDescriptionRef.current = editor)}
          initialValue=""
          init={{
            height: 480,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Box>

      <Box className="flex justify-center">
        <Button type="submit" variant="contained" className="bg-green-500">
          Create
        </Button>
      </Box>
    </form>
  );
};

export default CreateProduct;
