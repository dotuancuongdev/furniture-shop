import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context";
import api from "../api";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import DoneIcon from "@mui/icons-material/Done";
import { Done } from "@mui/icons-material";

const EditCategory = () => {
  const [detailCategory, setDetailCategory] = useState(null);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, setHeader } = appContext;

  const category = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/categories/${category.id}`);
        setDetailCategory(response.data);
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

    getDetail();

    return () => {
      ignore = true;
    };
  }, []);

  const handleEditName = (e) => {
    setDetailCategory((currentCategory) => ({
      ...currentCategory,
      name: e.target.value,
    }));
  };
  const handleEditDescription = (e) => {
    setDetailCategory((currentCategory) => ({
      ...currentCategory,
      description: e.target.value,
    }));
  };

  const handleUpdateCategory = async () => {
    try {
      setLoading(true);

      await api.put(`/categories/${category.id}`, detailCategory);
      setSnackbar({
        isOpen: true,
        message: "Update category successfully",
        severity: "success",
      });
      setLoading(false);
      navigate(`/category`);
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: error.message,
        severity: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeader("Update Category");
  }, []);

  return (
    <Box className="">
      <Box className="flex justify-end gap-3 mb-4">
        <Button variant="contained" onClick={() => navigate(`/category`)}>
          <TurnLeftIcon />
        </Button>
        <Button
          variant="contained"
          className="bg-green-500 "
          onClick={handleUpdateCategory}
        >
          <Done />
        </Button>
      </Box>

      <TextField
        label="Name"
        variant="outlined"
        size="small"
        className="w-full mb-3"
        value={detailCategory?.name || ""}
        onChange={handleEditName}
      />
      <TextField
        label="Description"
        variant="outlined"
        size="small"
        multiline
        rows={3}
        className="w-full "
        value={detailCategory?.description || ""}
        onChange={handleEditDescription}
      />
    </Box>
  );
};

export default EditCategory;
