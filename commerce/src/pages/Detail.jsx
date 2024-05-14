import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";
import { AppContext } from "../context";
import { formatPrice } from "../helper";

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

  return (
    <Box className="max-w-6xl mx-auto">
      {detail && (
        <>
          <Box className="flex justify-center">
            <Box className="flex-[6] flex gap-3 ">
              <Box className="flex-1  ">
                <Box className="flex flex-col gap-2 max-h-[480px] rounded-lg overflow-y-scroll pr-2">
                  {detail.images.map((img, idx) => (
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
                  src={detail.thumbnail}
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
                    type="number"
                    className=" w-16"
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
