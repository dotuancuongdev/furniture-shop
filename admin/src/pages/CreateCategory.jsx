import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../context";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;
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
          message: "Success",
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
  return (
    <Box className=" w-full flex justify-center items-center">
      <Box className="flex flex-col gap-3 w-1/3 rounded-md shadow-xl p-5">
        <Typography className="uppercase text-center font-medium">
          create a new category
        </Typography>
        <TextField
          label="Name"
          id="outlined-size-small"
          size="small"
          value={name}
          onChange={handleChangeName}
        />
        <TextField
          label="Descpription"
          id="outlined-size-small"
          size="small"
          multiline
          rows={2}
          value={description}
          onChange={handleChangeDescription}
        />
        <Button
          variant="contained"
          onClick={handleCreateNewCategory}
          className="bg-green-500 mt-6"
        >
          create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCategory;
