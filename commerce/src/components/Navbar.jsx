import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import api from "../api";
import { AppContext } from "../context";

const MenuItem = ({ name, subItems }) => {
  const navigate = useNavigate();
  return (
    <Box className="relative cursor-pointer group">
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

const Navbar = () => {
  const [menu, setMenu] = useState([]);
  const appContext = useContext(AppContext);
  const { setSnackbar } = appContext;

  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    const getMenu = async () => {
      try {
        const res = await api.get(`/categories/menu`);
        if (!ignore) {
          setMenu(res.data);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    };
    getMenu();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box className="pt-20">
      <Typography className=" text-center my-6 " variant="h3">
        <span className="cursor-pointer" onClick={() => navigate(`/`)}>
          Beau - Paris
        </span>
      </Typography>
      <Box className="mb-12 xl:px-48">
        <Box className="flex flex-col gap-[1px]">
          <Divider className=" bg-zinc-400" />
          <Divider className="bg-zinc-400" />
        </Box>

        <Accordion className="mb-[1px] xl:hidden">
          <AccordionSummary
            expandIcon={<DensityMediumIcon className="text-base" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            MENU
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-3">
            <Typography onClick={() => navigate(`/`)}>Home</Typography>
            <Typography onClick={() => navigate(`/product`)}>
              Products
            </Typography>
            {menu.map((item) => (
              <Typography
                key={item._id}
                className=""
                onClick={() => navigate(`/product?categoryId=${item._id}`)}
              >
                {item.name}
              </Typography>
            ))}
            <Typography>Contact us</Typography>
            <Typography>FAQ</Typography>
          </AccordionDetails>
        </Accordion>

        <Box className="hidden xl:flex justify-center items-center gap-7 py-4">
          <Typography
            className="uppercase cursor-pointer hover:text-orange-500"
            onClick={() => navigate(`/`)}
          >
            home
          </Typography>
          <Typography
            className="uppercase cursor-pointer hover:text-orange-500"
            onClick={() => navigate(`/product`)}
          >
            products
          </Typography>
          {menu.map((item) => (
            <Typography
              key={item._id}
              className="cursor-pointer uppercase hover:text-orange-500"
              onClick={() => navigate(`/product?categoryId=${item._id}`)}
            >
              {item.name}
            </Typography>
          ))}
          <Typography className="uppercase cursor-pointer hover:text-orange-500">
            contact us
          </Typography>
          <Typography className="uppercase cursor-pointer hover:text-orange-500">
            faq
          </Typography>
        </Box>

        <Box className="flex flex-col gap-[1px]">
          <Divider className="  bg-zinc-400" />
          <Divider className=" bg-zinc-400" />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
