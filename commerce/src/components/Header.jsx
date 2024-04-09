import { Badge, Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { AppContext } from "../context";

const Header = () => {
  const [collections, setCollections] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, cart } = appContext;

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getCollections = async () => {
      try {
        const res = await api.get(`categories/collections`);
        if (!ignore) {
          setCollections(res.data);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    };
    getCollections();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const getFeatured = async () => {
      try {
        const res = await api.get(`categories/featured`);
        if (!ignore) {
          setFeatured(res.data);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    };
    getFeatured();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const getPromotions = async () => {
      try {
        const res = await api.get(`categories/promotions`);
        if (!ignore) {
          setPromotions(res.data);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    };
    getPromotions();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box className="">
      <Box className="flex justify-evenly items-center shadow-xl h-[100px] fixed top-0 left-0 w-full z-[9999] bg-white">
        <img
          src="https://worldwidefurniture.ca/cdn/shop/files/WWLogoRevised2023_redstacked.png?v=1684238426&width=4354"
          alt=""
          className="w-36 py-5 cursor-pointer"
          onClick={() => navigate(`/`)}
        />
        <Box className="flex gap-10">
          <Box className="relative cursor-pointer p-2">
            <Typography className="hover:text-orange-500">
              Collections
            </Typography>
            {/* <Box className="absolute top-11 left-[-16px] bg-white p-4 w-44 h-[300px] overflow-y-auto z-[999]">
              <ul className="flex flex-col gap-4">
                {collections.map((item, idx) => (
                  <li key={idx} className="hover:text-orange-500">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/product?categoryId=${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Box> */}
          </Box>
          <Box className="relative cursor-pointer p-2">
            <Typography className="hover:text-orange-500">Featured</Typography>
            {/* <Box className="absolute top-11 left-[-16px] bg-white px-4 w-44 h-[400px] overflow-y-auto z-[999]">
            <ul>
              {featured.map((item, idx) => (
                <li key={idx} className="hover:text-orange-500">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/product?categoryId=${item._id}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box> */}
          </Box>
          <Box className="relative cursor-pointer p-2">
            <Typography className="hover:text-orange-500">
              Promotions
            </Typography>
            {/* <Box className="absolute top-11 left-[-16px] bg-white px-4 w-44 h-[400px] overflow-y-auto z-[999]">
            <ul>
              {promotions.map((item, idx) => (
                <li key={idx} className="hover:text-orange-500">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/product?categoryId=${item._id}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box> */}
          </Box>
          <Typography className="cursor-pointer p-2 hover:text-green-500">
            Service
          </Typography>
          <Typography className="cursor-pointer p-2 hover:text-green-500">
            Blog
          </Typography>
          <Typography className="cursor-pointer p-2 hover:text-green-500">
            About Us
          </Typography>
          <Typography className="cursor-pointer p-2 hover:text-green-500">
            Showroom
          </Typography>
        </Box>

        <Box
          onClick={() => {
            navigate(`/checkout`);
          }}
          className="cursor-pointer px-2 flex gap-2"
        >
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCartIcon color="action" />
          </Badge>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
