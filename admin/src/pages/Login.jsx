import { Button, TextField } from "@mui/material";
import api from "../api";
import axios from "axios";
import React, { useContext, useState } from "react";
import { appContext } from "../context";
import { TOKEN, USER } from "../constants";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(appContext);
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
      console.log(error);
    }
  };
  return (
    <>
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
      <Button variant="contained" onClick={login}>
        login
      </Button>
    </>
  );
};

export default Login;
