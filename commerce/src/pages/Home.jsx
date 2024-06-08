import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import api from "../api";
import { useNavigate } from "react-router-dom";

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
function Item(props) {
  return (
    <Box className="relative">
      <img src={props.item.url} alt="" className="w-full " />
      <Box className="absolute top-1/2 left-5 w-2/3 text-white">
        <button className="border-none py-2 px-3 bg-[#FFEBBB] rounded-sm uppercase xl:py-3 xl:px-5 xl:text-xl xl:mb-4">
          shop now
        </button>
        <Typography variant="h5" className="xl:text-5xl">
          {props.item.text}
        </Typography>
      </Box>
    </Box>
  );
}

const Home = () => {
  const [collections, setCollections] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, cart } = appContext;
  useEffect(() => {
    let ignore = false;
    const getCollections = async () => {
      try {
        const res = await api.get(`/categories/collections`);
        if (!ignore) {
          setCollections(res.data);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    };
    getCollections();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const getFeatured = async () => {
      try {
        const res = await api.get(`/categories/featured`);
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
    const getPromotions = async () => {
      try {
        const res = await api.get(`/categories/promotions`);
        if (!ignore) {
          setPromotions(res.data);
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      }
    };
    getPromotions();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      <Typography className=" text-center my-6" variant="h3">
        Beau - Paris
      </Typography>
      <Box className="mb-12 xl:px-48">
        <Divider className="mb-[1px]  " />
        <Divider className="" />

        <Accordion className="mb-[1px] xl:hidden">
          <AccordionSummary
            expandIcon={<DensityMediumIcon className="text-base" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            MENU
          </AccordionSummary>
          <AccordionDetails>detail</AccordionDetails>
        </Accordion>

        <Box className="hidden xl:flex justify-center items-center gap-7 py-4">
          <Typography className="uppercase">home</Typography>
          <MenuItem name="COLLECTIONS" subItems={collections} />
          <MenuItem name="FEATURED" subItems={featured} />
          <MenuItem name="PROMOTIONS" subItems={promotions} />
          <Typography className="uppercase">contact us</Typography>
          <Typography className="uppercase">faq</Typography>
        </Box>

        <Divider className="mb-[1px]  " />
        <Divider className=" " />
      </Box>

      <Carousel className="mb-10" animation="slide" duration={550}>
        {carouselHomePage.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <Box className="px-5 xl:px-48 xl:flex xl:gap-4 xl:flex-wrap">
        {collectionsHomePage.map((item) => (
          <Box className="mb-5 xl:w-[49%] xl:hover:cursor-pointer xl:hover:text-[#dba932]">
            <img src={item.url} alt="" className="w-full" />
            <Typography variant="h6" className="uppercase text-center py-2">
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>

      <img
        src="https://responsive-theme-paris.myshopify.com/cdn/shop/files/home-image-6_010e9538-14c0-433b-8cba-b376066b7f8f_1200x.jpg?v=1613639513"
        alt=""
        className="w-full"
      />

      <Box className="px-5 xl:px-48">
        <Box className="border-y-[1px] border-x-0 border-solid border-zinc-400 mb-5">
          <Typography variant="h5" className="text-center text-[#003872] py-2">
            Blog Post
          </Typography>
        </Box>
        <Box className="xl:flex gap-6">
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
          <Typography variant="h5" className="my-5 pb-3 text-center">
            Latest from Beau Paris
          </Typography>
          <Typography className=" my-5 pb-3 text-center">
            Be the first to know about exciting new designs, special events and
            much more.
          </Typography>
          <Box className="flex flex-col gap-3 mb-3 xl:flex-row xl:w-1/3 xl:mx-auto">
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
          <Box className="flex flex-col gap-3 mb-3 xl:flex-row xl:w-1/3 xl:mx-auto">
            <input
              type="text"
              placeholder="Email address"
              className="border border-zinc-300 h-10 px-3 rounded-sm xl:flex-1 xl:w-[200px]"
            />
            <button className="uppercase cursor-pointer border-none bg-[#FFEBBB] h-10 rounded-sm px-4">
              sign up
            </button>
          </Box>
        </Box>

        <Box className=" border border-dashed border-zinc-300" />
      </Box>
    </>
  );

  // return (
  //   <>
  //     <Carousel animation="slide" duration={550}>
  //       {slideShowImgs.map((item, i) => (
  //         <Item key={i} item={item} />
  //       ))}
  //     </Carousel>
  //     <Box className="max-w-6xl mx-auto mb-28">
  //       <Typography variant="h4" className="my-5 font-mono">
  //         Không gian Sống
  //       </Typography>
  //       <Box className="flex justify-center w-full h-auto ">
  //         <Box className="w-full h-full flex gap-4 mb-10">
  //           <Box className="flex-1  flex flex-col gap-4 ">
  //             <img
  //               src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView1.jpg?v=272"
  //               alt=""
  //               className="w-full h-full cursor-pointer  opacity-90 hover:opacity-100 duration-100"
  //             />
  //             <img
  //               src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView2.jpg?v=272"
  //               alt=""
  //               className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
  //             />
  //           </Box>
  //           <Box className="flex-[2] flex flex-col gap-4 ">
  //             <Box className="flex-[6]  cursor-pointer ">
  //               <img
  //                 src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView3.jpg?v=272"
  //                 alt=""
  //                 className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
  //               />
  //             </Box>
  //             <Box className="flex-[4] flex gap-4">
  //               <Box className="flex-1 ">
  //                 <img
  //                   src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView4.jpg?v=272"
  //                   alt=""
  //                   className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
  //                 />
  //               </Box>
  //               <Box className="flex-1 ">
  //                 <img
  //                   src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView5.jpg?v=272"
  //                   alt=""
  //                   className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
  //                 />
  //               </Box>
  //             </Box>
  //           </Box>
  //         </Box>
  //       </Box>
  //       <Box>
  //         <Typography className="my-5 text-2xl font-mono">
  //           Đánh giá thực tế
  //         </Typography>
  //         <MyCarousel items={rate} />
  //       </Box>
  //       <Box>
  //         <Typography className="my-5 text-2xl font-mono">
  //           Tin tức mới nhất
  //         </Typography>
  //         <MyCarousel items={news} />
  //       </Box>
  //       <Box>
  //         <Typography className="my-5 text-2xl font-mono">
  //           Khách hàng
  //         </Typography>
  //         <MyCarousel items={partners} />
  //       </Box>
  //     </Box>
  //   </>
  // );
};

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
export default Home;
