import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import DoneIcon from "@mui/icons-material/Done";

const TINYMCE_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, setHeader } = appContext;

  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCreateNewCategory = () => {
    if (!name) {
      setSnackbar({
        isOpen: true,
        message: "Name of Category is require ",
        severity: "error",
      });
      return;
    }

    const postCategory = async () => {
      try {
        setLoading(true);
        await api.post("/categories", { name, description });
        setSnackbar({
          isOpen: true,
          message: "Create category successfully",
          severity: "success",
        });
        setLoading(false);
        navigate("/category");
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.response?.data?.message || error.message,
          severity: "error",
        });
        setLoading(false);
      }
    };

    postCategory();
  };

  useEffect(() => {
    setHeader("Create Category");
  }, []);

  return (
    <Box className="">
      <Box className="flex justify-end gap-3 mb-4">
        <Button variant="contained" onClick={() => navigate(`/category`)}>
          <TurnLeftIcon />
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateNewCategory}
          className="bg-green-500"
        >
          <DoneIcon />
        </Button>
      </Box>

      <TextField
        label="Name"
        id="outlined-size-small"
        size="small"
        className="w-full mb-3"
        value={name}
        onChange={handleChangeName}
      />

      <TextField
        label="Descpription"
        id="outlined-size-small"
        size="small"
        multiline
        rows={3}
        className="w-full"
        value={description}
        onChange={handleChangeDescription}
      />
    </Box>
  );
};

export default CreateCategory;
