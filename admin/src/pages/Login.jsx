import { Box, Button, Grid, Snackbar, TextField } from "@mui/material";
import api from "../api";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context";
import { TOKEN, USER } from "../constants";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const appContext = useContext(AppContext);
  const { setSnackbar } = appContext;

  const userContext = useContext(AppContext);
  const { setUser } = userContext;
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const respone = await api.post("/auth/login", { username, password });

      setUser(respone.data.user);
      localStorage.setItem(USER, JSON.stringify(respone.data.user));
      localStorage.setItem(TOKEN, respone.data.token);
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: error.response.data.message,
        severity: "error",
      });
      setPassword("");
    }
  };
  return (
    <>
      <Box className="h-screen w-full flex">
        <Box className="flex-1 bg-zinc-200"></Box>
        <Box className="flex-1 flex justify-center items-center">
          <Box className="flex flex-col gap-2 w-1/3 p-3 shadow-md">
            <TextField
              label="Username"
              size="small"
              value={username}
              onChange={handleChangeUsername}
            />
            <TextField
              type="password"
              label="Password"
              size="small"
              value={password}
              onChange={handleChangePassword}
            />
            <Button variant="contained" onClick={login} className="mt-7">
              login
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
