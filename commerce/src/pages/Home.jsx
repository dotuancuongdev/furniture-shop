import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import Carousel from "react-material-ui-carousel";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { formatPrice, shortenString } from "../helper";

const carouselHomePage = [
  {
    url: "https://a-static.besthdwallpaper.com/light-cream-armrest-set-and-spacious-living-room-design-wallpaper-1920x1080-92155_48.jpg",
    text: "Looking for something a little out of the ordynary",
  },
  {
    url: "https://wallpapers.com/images/hd/modern-lounge-chairs-furniture-tz5u5fij7fs5c0km.jpg",
    text: "Luxurious, modern, comfortable, beautiful",
    location: "",
  },
  {
    url: "https://mrwallpaper.com/images/hd/modern-tan-furniture-in-a-stylish-interior-1p8lqahjzvgac2vw.jpg",
    text: "Luxurious, modern, comfortable, beautiful",
  },
];

const collectionsHomePage = [
  {
    name: "living room",
    url: "https://storage.atlasplan.com/public/assets/press/2023-09-living-room-wall-cladding/1-living-room-in-atlas-plan-porcelain-stoneware-clamp_960_960_50.jpg",
  },
  {
    name: "workroom",
    url: "https://imgmedia.lbb.in/media/2023/11/6556fe9ff9ed621efb5cc77e_1700200095922.jpg",
  },
  {
    name: "kitchen",
    url: "https://static.thcdn.com/productimg/960/960/14235050-6945036437967079.jpg",
  },
  {
    name: "bedroom",
    url: "https://wallpanelsworld.co.uk/product_images/uploaded_images/chevron-panelling-behind-a-bed-1-.jpg",
  },
];

const posts = [
  {
    url: "https://responsive-theme-paris.myshopify.com/cdn/shop/articles/blog-post-6_1200x.jpg?v=1534880023",
    title: "Designing for a Restaurant",
    date: "August 21, 2018",
    description:
      "You go out to a restaurant to eat delicious food, of course - but the design and decor are important as well - here's what to keep in mind!",
  },
  {
    url: "https://responsive-theme-paris.myshopify.com/cdn/shop/articles/blog-post-5_1200x.jpg?v=1534879987",
    title: "Kitchen Lighting Guide",
    date: "August 22, 2019",
    description:
      "Lighting in the kitchen needs to look good and be practical. We'll go over the three areas of lighting you need to consider so you're not cooking in the dark.",
  },
  {
    url: "https://responsive-theme-paris.myshopify.com/cdn/shop/articles/blog-post-1_1200x.jpg?v=1534879711",
    title: "Making your bedroom cozy",
    date: "August 23, 2020",
    description:
      "If you can't sleep on a cloud, try your best to make sure your bedroom feels like one! Sweet dreams ahead.",
  },
];

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

function Item(props) {
  return (
    <Box className="relative">
      <img src={props.item.url} alt="" className="w-full " />
      <Box className="absolute top-1/2 left-5 w-2/3 text-white">
        <button className="border-none py-2 px-3 bg-[#FFEBBB] rounded-sm uppercase xl:py-3 xl:px-5 xl:text-xl xl:mb-4">
          shop now
        </button>
        <Typography variant="h5" className="xl:text-5xl ">
          {props.item.text}
        </Typography>
      </Box>
    </Box>
  );
}

const Home = () => {
  const [featured, setFeatured] = useState([]);

  const [iconic, setIconic] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [quantity, setQuantity] = useState(1);

  const appContext = useContext(AppContext);
  const { setSnackbar, cart, setCart } = appContext;

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getFeatured = async () => {
      try {
        const res = await api.get(`/products/featured`);
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
    const getIconic = async () => {
      try {
        const res = await api.get(`/products/iconic`);
        if (!ignore) {
          setIconic(res.data);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    };
    getIconic();
    return () => {
      ignore = true;
    };
  }, []);

  const handleChangeQuantityInput = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const foundProduct = cart.find((p) => p._id === iconic._id);
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

    const newPrd = { ...iconic, quantity: quantity };
    setCart([...cart, newPrd]);
    setOpenModal(true);
  };

  return (
    <>
      <Carousel className="mb-10" animation="slide" duration={550}>
        {carouselHomePage.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <Box className="px-5 xl:px-48 xl:flex xl:gap-4 xl:flex-wrap">
        {collectionsHomePage.map((item, idx) => (
          <Box
            key={idx}
            className="mb-5 xl:w-[49%] xl:hover:cursor-pointer xl:hover:text-[#dba932]"
            onClick={() => navigate(`/product`)}
          >
            <img src={item.url} alt="" className="w-full" />
            <Typography variant="h6" className="uppercase text-center py-2">
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box className="px-5 xl:px-48  mb-5 mt-12">
        <Divider className="bg-zinc-400" />
        <Typography variant="h5" className="text-center text-[#003872] py-2">
          Featured Fixtures
        </Typography>
        <Divider className="bg-zinc-400" />
        {featured.length !== 0 ? (
          <Box className="grid grid-cols-2 gap-5 mt-10 xl:flex">
            {featured.map((item) => (
              <Box
                key={item._id}
                className="xl:flex-1 mb-7 flex flex-col gap-4 cursor-pointer hover:text-zinc-400 duration-500"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img src={item.thumbnail} alt="" className="w-full" />
                <Typography className="text-center xl:hidden">
                  {shortenString(item.name)}
                </Typography>
                <Typography className="text-center hidden xl:block">
                  {item.name}
                </Typography>
                <Typography className="text-center font-medium">
                  {formatPrice(item.price)}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box className="grid grid-cols-2 gap-5 mt-10 xl:flex">
            <Box className="xl:flex-1 mb-7 flex flex-col gap-4 ">
              <Skeleton
                variant="rectangular"
                className="w-full h-auto aspect-square"
              />
              <Skeleton variant="text" className="w-2/3 mx-auto h-6" />
              <Skeleton variant="text" className="w-1/4 mx-auto h-6" />
            </Box>
            <Box className="xl:flex-1 mb-7 flex flex-col gap-4 ">
              <Skeleton
                variant="rectangular"
                className="w-full h-auto aspect-square"
              />
              <Skeleton variant="text" className="w-2/3 mx-auto h-6" />
              <Skeleton variant="text" className="w-1/4 mx-auto h-6" />
            </Box>
            <Box className="xl:flex-1 mb-7 flex flex-col gap-4 ">
              <Skeleton
                variant="rectangular"
                className="w-full h-auto aspect-square"
              />
              <Skeleton variant="text" className="w-2/3 mx-auto h-6" />
              <Skeleton variant="text" className="w-1/4 mx-auto h-6" />
            </Box>
          </Box>
        )}
      </Box>
      <img
        src="https://responsive-theme-paris.myshopify.com/cdn/shop/files/home-image-6_010e9538-14c0-433b-8cba-b376066b7f8f_1200x.jpg?v=1613639513"
        alt=""
        className="w-full"
      />

      {iconic ? (
        <>
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
                  {iconic && (
                    <>
                      <Box className="xl:flex items-center gap-5 xl:mb-3">
                        <img
                          src={iconic.thumbnail}
                          alt=""
                          className="w-20 hidden xl:block"
                        />
                        <Typography className="mb-2">{iconic.name}</Typography>
                      </Box>
                      <Typography>
                        {quantity} * {formatPrice(iconic.price)}
                      </Typography>
                    </>
                  )}
                </Box>
                <Box className="xl:flex justify-center items-center gap-3">
                  <button
                    className="border-none bg-[#ffebbb] rounded-sm px-4 py-3 text-sm uppercase cursor-pointer mb-4 xl:m-0"
                    onClick={() => {
                      handleCloseModal();

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

          <Box className="px-5  mb-14 xl:px-48 xl:flex gap-10">
            <img
              src={iconic.thumbnail}
              alt=""
              className="w-full mb-5 xl:flex-1 xl:w-1/2"
            />
            <Box className="xl:flex-1">
              <Typography
                variant="h5"
                className="text-zinc-400 hover:text-black my-3 cursor-pointer"
                onClick={() => navigate(`/product/${iconic._id}`)}
              >
                {iconic.name}
              </Typography>
              <Divider />
              <Typography variant="h6" className="mb-5 mt-3">
                {formatPrice(iconic.price)}
              </Typography>
              <Typography className="mb-5">{iconic.summary}</Typography>
              <Box className="xl:flex gap-3">
                <Box className="w-full flex border border-solid border-zinc-200 rounded-sm mb-6 xl:flex-[2]">
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={quantity === 1}
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
                    className="cursor-pointer w-12 h-12 px-3 border-none bg-white hover:bg-zinc-200"
                  >
                    <AddIcon />
                  </button>
                </Box>
                <button
                  className="cursor-pointer w-full border border-solid border-[#FFEBBB] rounded-sm bg-[#FFEBBB] uppercase h-12 xl:flex-[3]"
                  onClick={handleAddToCart}
                  disabled={!quantity}
                >
                  add to cart
                </button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box className="px-5  mb-14 xl:px-48 xl:flex gap-10">
          <Skeleton
            variant="rectangular"
            className="w-full mb-5 xl:w-1/2 xl:flex-1 h-auto aspect-square"
          />
          <Box className="xl:flex-1">
            <Skeleton variant="rectangular" className="mb-3 h-10 " />
            <Divider />

            <Skeleton variant="rectangular" className="mb-5 mt-3 h-6" />
            <Skeleton variant="rectangular" className="mb-5 h-32 xl:h-48" />
          </Box>
        </Box>
      )}

      <Box className="px-5 xl:px-48  mb-5">
        <Divider className="bg-zinc-400" />
        <Typography variant="h5" className="text-center text-[#003872] py-2">
          Blog Post
        </Typography>
        <Divider className="bg-zinc-400" />
      </Box>
      <Box className="xl:flex gap-6 px-5 xl:px-48">
        {posts.map((item, idx) => (
          <Box key={idx} className="mb-9 flex flex-col gap-6 xl:flex-1">
            <Box className="h-[300px]">
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover cursor-pointer xl:hover:scale-105 xl:hover:duration-700 transition-transform "
              />
            </Box>
            <Box className="xl:flex-1">
              <Typography
                variant="h5"
                className="text-[#003872] mb-1 cursor-pointer"
              >
                {item.title}
              </Typography>
              <Typography className="text-zinc-400 mb-5">
                {item.date}
              </Typography>
              <Typography className="">{item.description}</Typography>
              <Box className="flex text-zinc-500 cursor-pointer">
                <Typography>Continue Reading </Typography>
                <NavigateNextIcon />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className=" border border-dashed border-zinc-300" />

      <Box className="mb-8">
        <Typography variant="h5" className="mb-5 mt-10 pb-3 text-center">
          Latest from Beau Paris
        </Typography>
        <Typography className=" my-5 pb-3 px-5 text-center">
          Be the first to know about exciting new designs, special events and
          much more.
        </Typography>
        <Box className="flex flex-col gap-3 mb-3 mx-5 xl:flex-row xl:w-1/2 xl:mx-auto">
          <input
            type="text"
            placeholder="First name"
            className="border border-zinc-300 h-10 px-3 rounded-sm xl:flex-1"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-zinc-300 h-10 px-3 rounded-sm xl:flex-1"
          />
        </Box>
        <Box className="flex flex-col gap-3 mb-10 mx-5 xl:flex-row xl:w-1/2 xl:mx-auto">
          <input
            type="text"
            placeholder="Email address"
            className="border border-zinc-300 h-10 px-3 rounded-sm xl:flex-1 xl:w-[200px]"
          />
          <button className="uppercase cursor-pointer border-none bg-[#FFEBBB] h-10 rounded-sm px-10">
            sign up
          </button>
        </Box>

        <Box className=" border border-dashed border-zinc-300" />
      </Box>
    </>
  );
};

export default Home;
