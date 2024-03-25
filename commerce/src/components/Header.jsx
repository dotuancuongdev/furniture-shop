import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <Box>
      <button>home</button>
      <button>product</button>
      <button>checkout</button>
    </Box>
  );
};

export default Header;