import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { useContext, useState } from "react";
import api from "../api";
import { TOKEN, USER } from "../constants";
import { AppContext } from "../context";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const appContext = useContext(AppContext);
  const { setSnackbar, setLoading, setUser } = appContext;

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      setLoading(true);
      const respone = await api.post("/auth/login", { username, password });

      setUser(respone.data.user);
      localStorage.setItem(USER, JSON.stringify(respone.data.user));
      localStorage.setItem(TOKEN, respone.data.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSnackbar({
        isOpen: true,
        message: error.response?.data?.message || error.message,
        severity: "error",
      });
      setPassword("");
    }
  };

  return (
    <>
      <Box className="h-screen w-full flex justify-center items-center bg-[url(https://wallpapers.com/images/hd/material-design-1920-x-1080-background-ej5wql37ojrto2i6.jpg)]">
        <Box className="w-5/6 h-5/6 bg-white flex rounded-lg">
          <Box className="flex-1 flex flex-col justify-center items-center gap-4">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/admin-login-5146573-4297423.png?f=webp"
              alt=""
              className="w-7/12 "
            />
            <Typography className="uppercase font-mono text-2xl">
              furniture shop
            </Typography>
          </Box>
          <Box className="bg-gradient-to-r from-purple-500 to-pink-500 w-[1px] h-5/6 my-auto" />
          <Box className="flex-1 flex flex-col justify-center items-center">
            <Box className="w-2/3 flex flex-col gap-6">
              <Box>
                <Typography variant="h4">Welcome </Typography>
                <Typography>Please enter your details below.</Typography>
              </Box>

              <TextField
                label="Username"
                size="small"
                value={username}
                onChange={handleChangeUsername}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="password"
                label="Password"
                size="small"
                value={password}
                onChange={handleChangePassword}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="contained"
                onClick={login}
                className="mt-4 bg-purple-500"
              >
                sign in
                <LoginIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
