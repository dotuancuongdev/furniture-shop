import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import axios from "axios";
import { Box, Pagination, Stack, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import { formatPrice, shortenString } from "../helper";

let totalPages;
let totalItems;
const pageSize = 8;
const Products = () => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [pageNumber, setpageNumber] = useState(1);
  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("categoryId");
  // console.log(query);

  const handleChangeMinPrice = (e) => {
    setMinPrice(e.target.value);
  };
  const handleChangeMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };
  const handleChangePageNumber = (e, value) => {
    setpageNumber(value);
  };
  useEffect(() => {
    let ignore = false;
    const getPrds = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/commerce`, {
          params: {
            pageSize: pageSize,
            pageNumber: pageNumber,
            categoryIds: [query],
          },
        });
        if (!ignore) {
          setProducts(res.data.items);
          setLoading(false);
          totalPages = res.data.totalPages;
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
        setLoading(false);
      }
    };
    getPrds();
    return () => {
      ignore = true;
    };
  }, [pageSize, pageNumber]);
  return (
    <>
      <Box className="flex-1 flex gap-3">
        <TextField
          type="number"
          label="Min Price"
          variant="outlined"
          size="small"
          value={minPrice}
          onChange={handleChangeMinPrice}
        />

        <TextField
          type="number"
          label="Max Price"
          variant="outlined"
          size="small"
          value={maxPrice}
          onChange={handleChangeMaxPrice}
        />
      </Box>

      <Box className="max-w-6xl mx-auto grid grid-cols-4 gap-5 mb-10">
        {products.map((item, idx) => (
          <Box
            key={idx}
            className="cursor-pointer relative"
            onClick={() => navigate(`/product/${item._id}`)}
          >
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
      <Box className="flex">
        <Stack spacing={2} className="mx-auto">
          <Pagination
            count={totalPages}
            shape="rounded"
            onChange={handleChangePageNumber}
            page={pageNumber}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Products;
