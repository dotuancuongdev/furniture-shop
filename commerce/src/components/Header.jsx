import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AppContext } from "../context";

const Header = () => {
  const [categories, setCategories] = useState([]);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get(`categories/all`);
        if (!ignore) {
          setCategories(res.data);
        }
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
    <Box>
      {categories.map((item, idx) => (
        <Button
          key={idx}
          onClick={() => {
            navigate(`/product?categoryId=${item._id}`, {});
          }}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );
};

export default Header;
