import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { AppContext } from "../context";
import api from "../api";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { formatPrice, shortenString } from "../helper";

const slideShowImgs = [
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_3.jpg?v=272",
  },
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_7.jpg?v=272",
  },
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_1_master.jpg?v=272",
  },
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_4.jpg?v=272",
  },
  {
    url: "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_6.jpg?v=272",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(category, categories, theme) {
  return {
    fontWeight:
      categories.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [filterPrds, setFilterPrds] = useState([]);
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minPrice: 0,
      maxPrice: 100000000,
      categoryIds: [],
      pageSize: 10,
      pageNumber: 1,
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    let ignore = false;
    const queryParams = {
      categories: data.categoryIds[0],
      minPrice: data.minPrice,
      MaxPrice: data.maxPrice,
      pageSize: 10,
      pageNumber: 1,
    };
    const getProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/commerce`, {
          params: queryParams,
        });
        if (!ignore) {
          console.log(res.data);
          navigate(`/product?categoryIds=${data.categoryIds[0]}`);
          setFilterPrds(res.data.items);
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
    getProducts();
    return () => {
      ignore = true;
    };
  };
  const handleChangeCategory = (event) => {
    // console.log(event.target);

    setValue("categoryIds", event.target.value);
  };
  const selectedCategoryValues = watch("categoryIds", []);
  function Item(props) {
    return (
      <Paper>
        <img src={props.item.url} alt="" className="w-full h-auto" />
      </Paper>
    );
  }
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
    <>
      <Carousel animation="slide" duration={550}>
        {slideShowImgs.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <Box className="max-w-6xl mx-auto mb-28">
        <Typography variant="h4" className="my-5 font-mono">
          Không gian Sống
        </Typography>
        <Box className="flex justify-center w-full h-auto ">
          <Box className="w-full h-full flex gap-4">
            <Box className="flex-1  flex flex-col gap-4 ">
              <img
                src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView1.jpg?v=272"
                alt=""
                className="w-full h-full cursor-pointer  opacity-90 hover:opacity-100 duration-100"
              />
              <img
                src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView2.jpg?v=272"
                alt=""
                className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
              />
            </Box>
            <Box className="flex-[2] flex flex-col gap-4 ">
              <Box className="flex-[6]  cursor-pointer ">
                <img
                  src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView3.jpg?v=272"
                  alt=""
                  className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                />
              </Box>
              <Box className="flex-[4] flex gap-4">
                <Box className="flex-1 ">
                  <img
                    src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView4.jpg?v=272"
                    alt=""
                    className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                  />
                </Box>
                <Box className="flex-1 ">
                  <img
                    src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView5.jpg?v=272"
                    alt=""
                    className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="max-w-6xl mx-auto mb-10">
        <ul>
          {categories.map((item, idx) => (
            <li key={idx}>
              <Link to={`/product?categoryId=${item._id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </Box>
      <Box className="max-w-6xl mx-auto grid grid-cols-4 gap-5">
        {filterPrds.map((item, idx) => (
          <Box key={idx} className="cursor-pointer relative ">
            <Box
              className={`absolute top-3 left-3 bg-[#F41919] text-white px-1 py-[2px] ${
                Math.floor((1 - item.price / item.originalPrice) * 100) === 0
                  ? "hidden"
                  : ""
              }`}
            >
              {`-${Math.floor((1 - item.price / item.originalPrice) * 100)}%`}
            </Box>
            {item.stock === 0 && (
              <Box className="absolute top-3 right-3 bg-white text-orange-400 px-1 py-[2px]">
                Tạm hết hàng
              </Box>
            )}
            <img
              src={item.thumbnail}
              alt={item.thumbnail}
              className="h-72 w-full object-cover mb-2"
            />
            <Box className="flex flex-col justify-center items-center">
              <Typography>{shortenString(item.name, 25)}</Typography>
              <Box>
                {item.price === item.originalPrice ? (
                  <Box>
                    <Typography className="text-orange-500">
                      {formatPrice(item.originalPrice)}
                    </Typography>
                  </Box>
                ) : (
                  <Box className="flex gap-4">
                    <Typography className="text-orange-500">
                      {formatPrice(item.price)}
                    </Typography>
                    <Typography className="line-through text-zinc-400">
                      {formatPrice(item.originalPrice)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Home;
