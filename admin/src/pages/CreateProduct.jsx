import { yupResolver } from "@hookform/resolvers/yup";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
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

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { Done } from "@mui/icons-material";
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../api";
import { AppContext } from "../context";

const TINYMCE_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

const allowedExtensions = ["png", "jpg", "jpeg"];
const maxSizeInBytes = 5 * Math.pow(2, 10) * Math.pow(2, 10);

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number().typeError("price is a required field").required(),
    stock: yup.number(),
    thumbnail: yup.object(),
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);

  const editorDescriptionRef = useRef(null);
  const editorSummaryRef = useRef(null);

  const navigate = useNavigate();
  const theme = useTheme();

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, setHeader } = appContext;

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
          message: "Create product successfully",
          severity: "success",
        });
        setLoading(false);
        navigate(`/product`);
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

  function handleChangeThumbnail(event) {
    if (!event.target.files || !event.target.files[0]) return;
    const file = event.target.files[0];
    const fileName = file.name;
    const extension = fileName.split(".").pop();
    const lowerCaseExtension = extension.toLowerCase();
    const checkExtension = allowedExtensions.includes(lowerCaseExtension);
    if (!checkExtension) {
      setSnackbar({
        isOpen: true,
        message: `Allowed Extension:  ${allowedExtensions.join(", ")}`,
        severity: "warning",
      });
      return;
    }

    const size = file.size;
    if (size > maxSizeInBytes) {
      setSnackbar({
        isOpen: true,
        message: `Maximum file's size is 5MB`,
        severity: "warning",
      });
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("thumbnail").src = e.target.result;
    };

    reader.readAsDataURL(file);

    setValue("thumbnail", file);
  }
  const removeThumbnail = () => {
    document.getElementById("thumbnail").src = "";
    document.getElementById("inputThumbnail").value = null;
    setValue("thumbnail", null);
  };

  useEffect(() => {
    let ignore = false;
    const getCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/categories/all`);
        if (!ignore) {
          setCategories(res.data);
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
    getCategories();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setHeader("Create Product");
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="flex justify-end gap-3 mb-4">
        <Button variant="contained" onClick={() => navigate(`/product`)}>
          <TurnLeftIcon />
        </Button>

        <Button type="submit" variant="contained" className="bg-green-500">
          <Done />
        </Button>
      </Box>

      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        size="small"
        className={`${errors.name ? "" : "mb-6"} w-full`}
        {...register("name")}
      />
      {errors.name && (
        <Typography className="text-red-500">{errors.name.message}</Typography>
      )}

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
          <Typography
            className={errors.price?.message ? "text-red-500" : "text-white"}
          >
            {errors.price?.message || "a"}
          </Typography>
        </Box>

        <Box className="flex-1">
          <TextField
            id="outlined-basic"
            label="Stock"
            variant="outlined"
            type="number"
            size="small"
            defaultValue={0}
            className={`${errors.stock ? "" : "mb-6"} w-full`}
            {...register("stock")}
          />
          <Typography
            className={errors.stock?.message ? "text-red-500" : "text-white"}
          >
            {errors.stock?.message || "a"}
          </Typography>
        </Box>

        <FormControl className="w-full flex-[2]">
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

      <>
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
      </>

      <br />

      <>
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
      </>
      <>
        <Typography variant="h6">Thumbnail</Typography>
        <Box className="flex">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              id="inputThumbnail"
              onChange={handleChangeThumbnail}
            />
          </Button>
          <img id="thumbnail" src="" alt="" className="max-w-20" />
        </Box>
        <Button onClick={removeThumbnail}>remove thumbnail</Button>
      </>
    </form>
  );
};

export default CreateProduct;
