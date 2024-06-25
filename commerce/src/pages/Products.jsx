import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Modal,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import { AppContext } from "../context";
import { formatPrice, shortenString } from "../helper";

let totalPages;
const pageSize = 24;

const FILTER_PRICE = 1;
const QUICK_SHOP = 2;
const NOTIFICATION_ADD_TO_CART_SUCCESSFULLY = 3;

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 768,
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  padding: "16px 24px",
  borderRadius: 1,
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [minPriceString, setMinPriceString] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [maxPriceString, setMaxPriceString] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [detailPrd, setDetailPrd] = useState(null);

  const [contentModal, setContentModal] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, cart, setCart } = appContext;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("categoryId");

  const handleAddToCart = () => {
    const foundProduct = cart.find((p) => p._id === detailPrd._id);
    if (foundProduct) {
      const updateProducts = cart.map((prd) => {
        if (prd._id === foundProduct._id) {
          return { ...prd, quantity: prd.quantity + 1 };
        }
        return prd;
      });
      setCart(updateProducts);
      setContentModal(3);
      setOpenModal(true);
      return;
    }

    const newPrd = { ...detailPrd, quantity: 1 };
    setCart([...cart, newPrd]);
    setContentModal(3);
    setOpenModal(true);
  };
  const renderModalContent = () => {
    if (contentModal === FILTER_PRICE) {
      return (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter by price
          </Typography>
          <Box className="flex flex-col gap-5 mt-6">
            <TextField
              type="number"
              label="From"
              variant="outlined"
              size="small"
              className="w-full"
              value={minPriceString}
              onChange={handleChangeMinPrice}
            />

            <TextField
              type="number"
              label="To"
              variant="outlined"
              size="small"
              className="w-full"
              value={maxPriceString}
              onChange={handleChangeMaxPrice}
            />
            <Button
              variant="contained"
              onClick={() => {
                handleApplyFilter();
                handleCloseModal();
              }}
              disabled={maxPriceString === "" || minPriceString === ""}
              className="w-full bg-[#ffebbb] text-black"
            >
              apply
            </Button>
          </Box>
        </>
      );
    }
    if (contentModal === QUICK_SHOP) {
      return (
        <Box>
          {detailPrd && (
            <Box className="flex gap-10">
              <Box className="flex-1">
                <img src={detailPrd.thumbnail} alt="" className=" w-full" />
              </Box>
              <Box className="flex-1">
                <Typography variant="h5">{detailPrd.name}</Typography>
                <Divider className="my-5" />
                <Typography>{formatPrice(detailPrd.price)}</Typography>
                <button
                  className="border-none bg-[#ffebbb] w-full px-3 py-2 uppercase my-5 cursor-pointer"
                  onClick={handleAddToCart}
                >
                  add to cart
                </button>
              </Box>
            </Box>
          )}
        </Box>
      );
    }
    if (contentModal === NOTIFICATION_ADD_TO_CART_SUCCESSFULLY) {
      return (
        <Box>
          <Box className=" text-end">
            <CloseIcon className="cursor-pointer" onClick={handleCloseModal} />
          </Box>
          <Box className="flex gap-2 text-[#003872]">
            <DoneIcon className="text-xl xl:text-3xl" />
            <Typography className="text-xl xl:text-3xl">Just Added</Typography>
          </Box>
          <Divider className="my-4" />
          <Box className="mb-5">
            <Box className="xl:flex items-center gap-5 xl:mb-3">
              <img
                src={detailPrd.thumbnail}
                alt=""
                className="w-20 hidden xl:block"
              />
              <Typography className="mb-2">{detailPrd.name}</Typography>
            </Box>
            <Typography>{formatPrice(detailPrd.price)}</Typography>
          </Box>
          <Box className="xl:flex justify-center items-center gap-3">
            <button
              className="border-none bg-[#ffebbb] rounded-sm px-4 py-3 text-sm uppercase cursor-pointer mb-4 xl:m-0"
              onClick={() => {
                setOpenModal(false);
                navigate(`/checkout`);
              }}
            >
              checkout
            </button>
            <Typography>
              or
              <strong
                className="cursor-pointer ml-[4px] hover:underline-offset-2"
                onClick={handleCloseModal}
              >
                Continue Shopping
              </strong>
            </Typography>
          </Box>
        </Box>
      );
    }
  };

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
    setPageNumber(1);
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>{renderModalContent()}</Box>
      </Modal>

      <Box className="px-5 xl:px-48">
        <Typography variant="h5" className="text-center text-[#003872] py-2">
          Products
        </Typography>
        <Divider />
        <Box className="flex justify-center gap-2 italic mt-8 mb-5 xl:justify-start">
          <Typography
            className="text-xs text-zinc-400 hover:text-black cursor-pointer"
            onClick={() => navigate(`/`)}
          >
            Home
          </Typography>
          <Typography className="text-xs">{`>`}</Typography>

          <Typography
            className="text-xs text-zinc-400 hover:text-black cursor-pointer"
            onClick={() => navigate(`/product`)}
          >
            Products
          </Typography>
          <Typography className="text-xs">{`>`}</Typography>

          <Typography className="text-xs">{`Page ${pageNumber} of ${totalPages}`}</Typography>
        </Box>
        <Box
          className="uppercase border border-solid border-[#FFEABB] text-[#FFEABB] text-center rounded-sm py-3 mb-8 xl:hidden"
          onClick={() => {
            setContentModal(1);
            handleOpenModal();
          }}
        >
          filter by
        </Box>
        <Box className="flex gap-4">
          <Box className="hidden xl:block flex-1">
            <Typography variant="h5" className="text-[#003872]">
              Price
            </Typography>
            <Divider className="my-5" />
            <Box className="flex flex-col gap-5 mt-6">
              <TextField
                type="number"
                label="From"
                variant="outlined"
                size="small"
                className="w-full"
                value={minPriceString}
                onChange={handleChangeMinPrice}
              />

              <TextField
                type="number"
                label="To"
                variant="outlined"
                size="small"
                className="w-full"
                value={maxPriceString}
                onChange={handleChangeMaxPrice}
              />
              <Button
                variant="contained"
                onClick={() => {
                  handleApplyFilter();
                  handleCloseModal();
                }}
                disabled={maxPriceString === "" || minPriceString === ""}
                className="w-full bg-[#ffebbb] text-black"
              >
                apply
              </Button>
            </Box>
          </Box>

          <Box className="flex-[3] grid grid-cols-2 gap-4 mb-8 xl:grid-cols-3">
            {products.map((item) => (
              <Box
                key={item._id}
                className=" cursor-pointer relative group"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <Box className="absolute top-1/2 left-0  w-full  justify-center hidden xl:group-hover:flex">
                  <button
                    className="cursor-pointer border-none bg-[#ffebbb] px-3 py-2 text-base uppercase rounded-sm hover:bg-zinc-300 duration-500 z-50"
                    onClick={(e) => {
                      setDetailPrd(item);
                      e.stopPropagation();
                      setContentModal(2);
                      setOpenModal(true);
                    }}
                  >
                    quick shop
                  </button>
                </Box>
                <img src={item.thumbnail} alt="" className="w-full mb-4" />
                <Typography className="xl:hidden mb-3">
                  {shortenString(item.name, 30)}
                </Typography>
                <Typography className="hidden xl:block text-center px-6 mb-3 group-hover:text-zinc-400 duration-500">
                  {item.name}
                </Typography>

                {item.stock === 0 ? (
                  <Typography className="group-hover:text-zinc-400">
                    Sold out
                  </Typography>
                ) : (
                  <Box>
                    {item.price === item.originalPrice ? (
                      <Box>
                        <Typography className=" text-sm text-center font-semibold group-hover:text-zinc-400 duration-500">
                          {formatPrice(item.originalPrice)}
                        </Typography>
                      </Box>
                    ) : (
                      <Box className="text-center xl:flex justify-center gap-5">
                        <Typography className=" text-sm group-hover:text-zinc-400 duration-500">
                          {formatPrice(item.price)}
                        </Typography>
                        <Typography className="line-through text-zinc-400 text-sm group-hover:text-zinc-400 duration-500">
                          {formatPrice(item.originalPrice)}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
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
      </Box>
    </>
  );

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
