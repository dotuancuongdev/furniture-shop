import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        const res = await api.get(`/categories/collections`);
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
        const res = await api.get(`/categories/featured`);
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
        const res = await api.get(`/categories/promotions`);
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
    <Box className="fixed top-0 left-0 w-full z-[9999] bg-white ">
      <Box className="mx-auto xl:w-4/5 xl:flex xl:justify-between items-center ">
        <Box className="mx-6 my-4 xl:my-4 ">
          <Box className="border border-solid rounded-sm border-zinc-300 w-full">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search ..." />
          </Box>
          {/* <Box className="hidden border border-solid border-zinc-400 rounded-sm py-3 w-1/2 mx-auto text-center xl:flex justify-center gap-3 mb-7">
            <Typography className="uppercase">vietnam (cad $)</Typography>
            <KeyboardArrowDownIcon />
          </Box> */}
        </Box>

        <Box className="flex justify-center gap-5 text-zinc-400 pb-3">
          <Typography className="text-sm">0968-666-888</Typography>
          <Box className="flex items-center">
            <ShoppingCartIcon className="text-sm" />
            <Typography className="uppercase text-sm">{`cart (${cart.length})`}</Typography>
          </Box>
          <Typography className="uppercase text-sm">checkout</Typography>
        </Box>
      </Box>
    </Box>
  );
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
          <Typography
            className="cursor-pointer p-2 hover:text-orange-500"
            onClick={() => navigate(`/product`)}
          >
            Products
          </Typography>
          <MenuItem name="Collections" subItems={collections} />
          <MenuItem name="Featured" subItems={featured} />
          <MenuItem name="Promotions" subItems={promotions} />
          <Typography className="cursor-pointer p-2 hover:text-orange-500">
            Service
          </Typography>
          <Typography className="cursor-pointer p-2 hover:text-orange-500">
            Blog
          </Typography>
          <Typography className="cursor-pointer p-2 hover:text-orange-500">
            About Us
          </Typography>
          <Typography
            className="cursor-pointer p-2 hover:text-orange-500"
            onClick={() => navigate(`/order-tracking`)}
          >
            Order-Tracking
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

const MenuItem = ({ name, subItems }) => {
  const navigate = useNavigate();
  return (
    <Box className="relative cursor-pointer p-2 group">
      <Typography className="hover:text-orange-500">{name}</Typography>
      <Box className="hidden bg-white p-2 absolute top-8 left-[-50%] flex-col gap-2 w-max max-w-72 max-h-[50vh] overflow-y-auto group-hover:flex hover:flex">
        {subItems.map((c) => (
          <Button
            title={c.name}
            key={c._id}
            onClick={() => {
              navigate(`product?categoryId=${c._id}`);
            }}
          >
            <Typography className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[200px] w-full">
              {c.name}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
