import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import { AppContext } from "../context";
import { formatPrice } from "../helper";

import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Detail = () => {
  const [detail, setDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, cart, setCart } = appContext;

  const params = useParams();

  useEffect(() => {
    let ignore = false;
    const getDetail = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/commerce/${params.id}`);

        if (!ignore) {
          setDetail(res.data);

          setLoading(false);
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

    getDetail();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChangeQuantityInput = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const handleIncreaseQuantity = () => {
    if (quantity === detail.stock) {
      alert("exceeding the permitted limits");
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
      setSnackbar({
        isOpen: true,
        message: "Added to cart successfully",
        severity: "success",
      });
      return;
    }

    const newPrd = { ...detail, quantity: quantity };
    setCart([...cart, newPrd]);
    setSnackbar({
      isOpen: true,
      message: "Success",
      severity: "success",
    });
  };

  let showcase = [];
  if (detail?.thumbnail) showcase = [detail.thumbnail];
  if (detail?.images && detail.images.length > 0)
    showcase = [...showcase, ...detail.images];

  return (
    <>
      {detail && (
        <Box>
          <Box className="px-5 xl:px-48 ">
            <Box className="xl:flex xl:gap-4">
              <Box className="mb-8 xl:flex-[3]">
                <img src={showcase[imgIdx]} alt="" className="w-full mb-2" />
                <Box className="flex gap-2 w-full overflow-x-auto">
                  {showcase.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => handleChangeImgIdx(idx)}
                      className=" min-w-24 xl:min-w-14 "
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
                      value={quantity}
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
                    disabled={detail.stock === 0}
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

            <Box className="flex justify-center border border-solid p-4 rounded-sm mt-7">
              <div
                className="prdDescription"
                dangerouslySetInnerHTML={{ __html: detail.description }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );

  return (
    <Box className="max-w-6xl mx-auto">
      {detail && (
        <>
          <Box className="flex justify-center">
            <Box className="flex-[6] flex gap-3 ">
              <Box className="flex-1  ">
                <Box className="flex flex-col gap-2 max-h-[480px] rounded-lg overflow-y-scroll pr-2">
                  {showcase.map((img, idx) => (
                    <Box
                      key={idx}
                      className=""
                      onClick={() => handleChangeImgIdx(idx)}
                    >
                      <img
                        src={img}
                        alt=""
                        className="object-cover cursor-pointer w-full rounded-lg"
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="flex-[4] ">
                <img
                  src={showcase[imgIdx]}
                  alt=""
                  className="w-full rounded-lg max-h-[480px]"
                />
              </Box>
            </Box>
            <Box className="flex-[4] pl-5 flex flex-col gap-6">
              <Typography variant="h6" className="font-semibold">
                {detail.name}
              </Typography>
              <Box>
                {detail.price === detail.originalPrice ? (
                  <Typography className="text-orange-500 text-lg font-semibold">
                    {formatPrice(detail.price)}
                  </Typography>
                ) : (
                  <Box className="flex gap-4 items-center">
                    <Box className="bg-zinc-200">
                      <Typography className="px-2 py-[2px] text-red-500 font-semibold">
                        -
                        {Math.floor(
                          (1 - detail.price / detail.originalPrice) * 100
                        )}
                        %
                      </Typography>
                    </Box>
                    <Typography className="text-orange-500 text-lg font-semibold">
                      {formatPrice(detail.price)}
                    </Typography>
                    <Typography className="text-zinc-400 line-through ">
                      {formatPrice(detail.originalPrice)}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Typography>Stock: {detail.stock}</Typography>
              <Box className="flex flex-col gap-2">
                <Box className="h-10 flex gap-2 ">
                  <button
                    className="bg-zinc-200 w-16 border-none rounded-md flex justify-center items-center"
                    onClick={handleDecreaseQuantity}
                    disabled={detail.stock === 0 || quantity === 1}
                  >
                    <RemoveIcon />
                  </button>

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    className=" w-16"
                    type="number"
                    value={quantity}
                    onChange={handleChangeQuantityInput}
                  />
                  <button
                    className="bg-zinc-200 w-16 border-none rounded-md flex justify-center items-center"
                    onClick={handleIncreaseQuantity}
                    disabled={detail.stock === 0}
                  >
                    <AddIcon />
                  </button>
                </Box>

                <Button
                  variant="contained"
                  className="  bg-orange-500 "
                  onClick={handleAddToCart}
                  disabled={detail.stock === 0}
                >
                  thêm vào giỏ
                </Button>
              </Box>
              <Box className="max-h-48 overflow-y-auto pr-1">
                <div
                  className="text-lg prdSummary"
                  dangerouslySetInnerHTML={{ __html: detail.summary }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="flex justify-center border border-solid p-4 rounded-sm mt-7">
            <div
              className="prdDescription"
              // className="w-full"
              dangerouslySetInnerHTML={{ __html: detail.description }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Detail;
