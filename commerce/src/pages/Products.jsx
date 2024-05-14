import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import { AppContext } from "../context";
import { formatPrice } from "../helper";

let totalPages;
const pageSize = 8;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [minPriceString, setMinPriceString] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [maxPriceString, setMaxPriceString] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar } = appContext;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("categoryId");

  const handleChangeMinPrice = (e) => {
    setMinPriceString(e.target.value);
  };
  const handleChangeMaxPrice = (e) => {
    setMaxPriceString(e.target.value);
  };

  const handleChangePageNumber = (e, value) => {
    setPageNumber(value);
  };

  const handleApplyFilter = () => {
    setMaxPrice(parseInt(maxPriceString));
    setMinPrice(parseInt(minPriceString));
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
            maxPrice: maxPrice,
            minPrice: minPrice,
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
  }, [pageNumber, query, maxPrice, minPrice]);

  return (
    <>
      <Box className="flex ">
        <Box className="flex-1 flex flex-col gap-3 w-full px-5">
          <TextField
            type="number"
            label="Min Price"
            variant="outlined"
            size="small"
            value={minPriceString}
            onChange={handleChangeMinPrice}
          />

          <TextField
            type="number"
            label="Max Price"
            variant="outlined"
            size="small"
            value={maxPriceString}
            onChange={handleChangeMaxPrice}
          />
          <Button
            variant="contained"
            onClick={handleApplyFilter}
            disabled={maxPriceString === "" || minPriceString === ""}
          >
            apply
          </Button>
        </Box>

        <Box className=" grid grid-cols-4 gap-5 mb-10 flex-[4]">
          {products.map((item) => (
            <Card
              title={item.name}
              key={item._id}
              className="max-w-[480px]"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <CardActionArea>
                {!!item.price &&
                  !!item.originalPrice &&
                  item.price !== item.originalPrice && (
                    <Box
                      className={`absolute top-3 left-3 bg-[#F41919] text-white px-1 py-[2px] rounded-md`}
                    >
                      <Typography>
                        -
                        {Math.floor(
                          (1 - item.price / item.originalPrice) * 100
                        )}
                        %
                      </Typography>
                    </Box>
                  )}

                {item.stock === 0 && (
                  <Box className="absolute top-3 right-3 bg-white text-orange-400 px-1 py-[2px]">
                    Tạm hết hàng
                  </Box>
                )}
                <CardMedia
                  component="img"
                  height="260"
                  image={item.thumbnail}
                  alt={item.name}
                />

                <CardContent>
                  <Typography className="inline-block w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.name}
                  </Typography>

                  <Box className="flex justify-center">
                    {item.price === item.originalPrice ? (
                      <Box>
                        <Typography className="text-orange-500">
                          {formatPrice(item.originalPrice)}
                        </Typography>
                      </Box>
                    ) : (
                      <Box className="flex gap-[5px] flex-wrap">
                        <Typography className="text-orange-500">
                          {formatPrice(item.price)}
                        </Typography>
                        <Typography className="line-through text-zinc-400">
                          {formatPrice(item.originalPrice)}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Box className="flex-1"></Box>
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
