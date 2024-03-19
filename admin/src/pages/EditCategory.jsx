import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context";
import api from "../api";
import { Box, Button, TextField, Typography } from "@mui/material";

const EditCategory = () => {
  const [detailCategory, setDetailCategory] = useState(null);
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;
  const category = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getDetail = async () => {
      try {
        setLoading(true);
        const respone = await api.get(`categories/${category.id}`);
        setDetailCategory(respone.data);
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    getDetail();
    return () => {
      ignore = true;
    };
  }, []);

  const handleEditName = (e) => {
    setDetailCategory({ ...detailCategory, name: e.target.value });
  };
  const handleEditDescription = (e) => {
    setDetailCategory({ ...detailCategory, description: e.target.value });
  };
  const handleUpdateCategory = async () => {
    try {
      setLoading(true);

      await api.put(`/categories/${category.id}`, detailCategory);
      setSnackbar({
        isOpen: true,
        message: "Update Category Success",
        severity: "success",
      });
      navigate(`/category`);
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: error.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box className="w-full h-screen flex justify-center items-center">
      <Box className="flex flex-col gap-3 w-1/3 rounded-md shadow-xl p-5">
        <Typography className="uppercase text-center font-medium">
          update category
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          value={detailCategory?.name || ""}
          onChange={handleEditName}
        />
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          multiline
          rows={3}
          value={detailCategory?.description || ""}
          onChange={handleEditDescription}
        />
        <Button
          variant="contained"
          className="bg-green-500 mt-6"
          onClick={handleUpdateCategory}
        >
          update category
        </Button>
      </Box>
    </Box>
  );
};

export default EditCategory;
