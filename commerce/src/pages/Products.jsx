import {
  Box,
  Button,
  Chip,
  Divider,
  Modal,
  Pagination,
  Skeleton,
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

const Wrapper = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("categoryId");
  return <Products key={query} />;
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [prdLoading, setPrdLoading] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [minPriceString, setMinPriceString] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [maxPriceString, setMaxPriceString] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const [detailPrd, setDetailPrd] = useState(null);
  const [contentModal, setContentModal] = useState(FILTER_PRICE);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const appContext = useContext(AppContext);
  const { setSnackbar, cart, setCart } = appContext;

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
      setContentModal(NOTIFICATION_ADD_TO_CART_SUCCESSFULLY);
      setOpenModal(true);
      return;
    }

    const newPrd = { ...detailPrd, quantity: 1 };
    setCart([...cart, newPrd]);
    setContentModal(NOTIFICATION_ADD_TO_CART_SUCCESSFULLY);
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
                  disabled={detailPrd.stock === 0}
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

  const handleDeleteChip = () => {
    setMinPrice(0);
    setMinPriceString("");
    setMaxPrice(0);
    setMaxPriceString("");
  };

  useEffect(() => {
    let ignore = false;
    const getPrds = async () => {
      try {
        setPrdLoading(true);
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
          totalPages = res.data.totalPages;
          setPrdLoading(false);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
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

          {totalPages && (
            <Typography className="text-xs">{`Page ${pageNumber} of ${totalPages}`}</Typography>
          )}
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
          {!prdLoading ? (
            <Box className="flex-[3] flex flex-col gap-3">
              {minPrice !== 0 && maxPrice !== 0 ? (
                <Chip
                  label={`${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`}
                  variant="outlined"
                  className="w-min"
                  onDelete={handleDeleteChip}
                />
              ) : (
                <Box className="h-8"></Box>
              )}
              <Box className="grid grid-cols-2 gap-4 mb-8 xl:grid-cols-3">
                {products.length === 0 ? (
                  <Box className=" text-center">
                    <Typography>No data</Typography>
                  </Box>
                ) : (
                  <>
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
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-full mb-4"
                        />
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
                  </>
                )}
              </Box>
            </Box>
          ) : (
            <Box className="flex-[3]">
              <Box className="h-8 mb-3"></Box>
              <Box className=" grid grid-cols-2 gap-4 mb-8 xl:grid-cols-3">
                <Box className="flex flex-col gap-2">
                  <Skeleton
                    variant="rectangular"
                    className="w-full h-auto aspect-square mb-3"
                  />
                  <Skeleton variant="text" className="w-2/3 h-8 mx-auto mb-3" />
                  <Skeleton variant="text" className="w-1/4 h-8 mx-auto " />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Skeleton
                    variant="rectangular"
                    className="w-full h-auto aspect-square mb-3"
                  />
                  <Skeleton variant="text" className="w-2/3 h-8 mx-auto mb-3" />
                  <Skeleton variant="text" className="w-1/4 h-8 mx-auto " />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Skeleton
                    variant="rectangular"
                    className="w-full h-auto aspect-square mb-3"
                  />
                  <Skeleton variant="text" className="w-2/3 h-8 mx-auto mb-3" />
                  <Skeleton variant="text" className="w-1/4 h-8 mx-auto " />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Skeleton
                    variant="rectangular"
                    className="w-full h-auto aspect-square mb-3"
                  />
                  <Skeleton variant="text" className="w-2/3 h-8 mx-auto mb-3" />
                  <Skeleton variant="text" className="w-1/4 h-8 mx-auto " />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Skeleton
                    variant="rectangular"
                    className="w-full h-auto aspect-square mb-3"
                  />
                  <Skeleton variant="text" className="w-2/3 h-8 mx-auto mb-3" />
                  <Skeleton variant="text" className="w-1/4 h-8 mx-auto " />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Skeleton
                    variant="rectangular"
                    className="w-full h-auto aspect-square mb-3"
                  />
                  <Skeleton variant="text" className="w-2/3 h-8 mx-auto mb-3" />
                  <Skeleton variant="text" className="w-1/4 h-8 mx-auto " />
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {products.length !== 0 && (
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
        )}
      </Box>
    </>
  );
};

export default Wrapper;
