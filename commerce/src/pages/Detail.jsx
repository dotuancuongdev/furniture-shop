import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Divider,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import { AppContext } from "../context";
import { formatPrice } from "../helper";

import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 480,
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  padding: "16px 24px",
  borderRadius: 1,
};

const Detail = () => {
  const [detail, setDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const appContext = useContext(AppContext);
  const { setSnackbar, cart, setCart } = appContext;

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getDetail = async () => {
      try {
        const res = await api.get(`/products/commerce/${params.id}`);

        if (!ignore) {
          setDetail(res.data);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    };

    getDetail();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChangeQuantityInput = (e) => {
    console.log(quantity);
    setQuantity(parseInt(e.target.value));
  };
  const handleIncreaseQuantity = () => {
    if (quantity === detail.stock) {
      alert(`The number of products in stock is ${detail.stock}`);
      return;
    }
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handleChangeImgIdx = (idx) => {
    setImgIdx(idx);
  };

  const handleAddToCart = () => {
    const foundProduct = cart.find((p) => p._id === detail._id);
    if (foundProduct) {
      const updateProducts = cart.map((prd) => {
        if (prd._id === foundProduct._id) {
          return { ...prd, quantity: prd.quantity + quantity };
        }
        return prd;
      });
      setCart(updateProducts);
      setOpenModal(true);
      return;
    }
    const newPrd = { ...detail, quantity: quantity };
    setCart([...cart, newPrd]);
    setOpenModal(true);
  };

  let showcase = [];
  if (detail?.thumbnail) showcase = [detail.thumbnail];
  if (detail?.images && detail.images.length > 0)
    showcase = [...showcase, ...detail.images];

  return (
    <>
      {detail ? (
        <Box>
          <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box>
                <Box className=" text-end">
                  <CloseIcon
                    className="cursor-pointer"
                    onClick={() => {
                      handleCloseModal();
                      setQuantity(1);
                    }}
                  />
                </Box>

                <Box className="flex gap-2 text-[#003872]">
                  <DoneIcon className="text-xl xl:text-3xl" />
                  <Typography className="text-xl xl:text-3xl">
                    Just Added
                  </Typography>
                </Box>
                <Divider className="my-4" />
                <Box className="mb-5">
                  <Box className="xl:flex items-center gap-5 xl:mb-3">
                    <img
                      src={detail.thumbnail}
                      alt=""
                      className="w-20 hidden xl:block"
                    />
                    <Typography className="mb-2">{detail.name}</Typography>
                  </Box>
                  <Typography>
                    {quantity} * {formatPrice(detail.price)}
                  </Typography>
                </Box>
                <Box className="xl:flex justify-center items-center gap-3">
                  <button
                    className="border-none bg-[#ffebbb] rounded-sm px-4 py-3 text-sm uppercase cursor-pointer mb-4 xl:m-0"
                    onClick={() => {
                      handleCloseModal();
                      setQuantity(1);
                      navigate(`/checkout`);
                    }}
                  >
                    checkout
                  </button>
                  <Typography>
                    or
                    <strong
                      className="cursor-pointer ml-[4px] hover:underline-offset-2"
                      onClick={() => {
                        handleCloseModal();
                        setQuantity(1);
                      }}
                    >
                      Continue Shopping
                    </strong>
                  </Typography>
                </Box>
              </Box>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
              ></Typography>
            </Box>
          </Modal>
          <Box className="px-5 xl:px-48 ">
            <Box className="xl:flex xl:gap-6">
              <Box className="mb-8 xl:flex-[3]">
                <img src={showcase[imgIdx]} alt="" className="w-full mb-2" />
                <Box className="flex gap-2 w-full overflow-x-auto">
                  {showcase.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => handleChangeImgIdx(idx)}
                      className=" min-w-24 xl:min-w-10 cursor-pointer"
                    >
                      <img src={img} alt="" className=" w-full " />
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box className="xl:flex-[2]">
                <Typography className="text-2xl text-[#003872] mb-2">
                  {detail.name}
                </Typography>
                <Divider className="mb-6" />

                <Box className="mb-2">
                  {detail.price === detail.originalPrice ? (
                    <Typography className="text-orange-500 text-lg font-semibold">
                      {formatPrice(detail.price)}
                    </Typography>
                  ) : (
                    <Box className="flex gap-4 items-center">
                      <Typography className="text-orange-500 text-lg font-semibold">
                        {formatPrice(detail.price)}
                      </Typography>
                      <Typography className="text-zinc-400 line-through ">
                        {formatPrice(detail.originalPrice)}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box className=" mb-6">
                  <div
                    className="text-lg prdSummary"
                    dangerouslySetInnerHTML={{ __html: detail.summary }}
                  />
                </Box>

                <Box className="xl:flex gap-3">
                  <Box className="w-full flex border border-solid border-zinc-200 rounded-sm mb-6 xl:flex-[2]">
                    <button
                      onClick={handleDecreaseQuantity}
                      disabled={detail.stock === 0 || quantity === 1}
                      className="cursor-pointer w-12 h-12 px-3 border-none bg-white hover:bg-zinc-200"
                    >
                      <RemoveIcon />
                    </button>
                    <Box className="w-[1px] bg-zinc-200" />
                    <input
                      value={quantity ? quantity : ""}
                      onChange={handleChangeQuantityInput}
                      className="w-full  text-lg text-center border-none"
                    />
                    <Box className="w-[1px] bg-zinc-200" />

                    <button
                      onClick={handleIncreaseQuantity}
                      disabled={detail.stock === 0}
                      className="cursor-pointer w-12 h-12 px-3 border-none bg-white hover:bg-zinc-200"
                    >
                      <AddIcon />
                    </button>
                  </Box>
                  <button
                    className="cursor-pointer w-full border border-solid border-[#FFEBBB] rounded-sm bg-[#FFEBBB] uppercase h-12 xl:flex-[3]"
                    onClick={handleAddToCart}
                    disabled={detail.stock === 0 || !quantity}
                  >
                    add to cart
                  </button>
                </Box>
                <Divider className="mb-6" />

                <Box className="flex justify-evenly ">
                  <Box className="flex items-center gap-1">
                    <XIcon className="text-xs" />
                    <Typography className="text-xs">Twitter</Typography>
                  </Box>
                  <Box className="flex items-center gap-1">
                    <FacebookIcon className="text-xs" />
                    <Typography className="text-xs">Facebook</Typography>
                  </Box>
                  <Box className="flex items-center gap-1">
                    <InstagramIcon className="text-xs" />
                    <Typography className="text-xs">Instagram</Typography>
                  </Box>
                  <Box className="flex items-center gap-1">
                    <MailOutlineIcon className="text-xs" />
                    <Typography className="text-xs">Email</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="px-5 xl:px-48 xl:flex gap-6">
          <Skeleton
            variant="rectangular"
            className="w-full h-auto aspect-square mb-2  xl:flex-[3]"
          />
          <Box className="flex gap-2 mb-8 xl:hidden ">
            <Skeleton
              variant="rectangular"
              className="flex-1 w-full h-auto aspect-square"
            />
            <Skeleton
              variant="rectangular"
              className="flex-1 w-full h-auto aspect-square"
            />
            <Skeleton
              variant="rectangular"
              className="flex-1 w-full h-auto aspect-square"
            />
          </Box>
          <Box className="xl:flex-[2]">
            <Skeleton variant="rectangular" className="h-8 mb-6" />
            <Skeleton variant="rectangular" className="h-8 w-1/4" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Detail;
