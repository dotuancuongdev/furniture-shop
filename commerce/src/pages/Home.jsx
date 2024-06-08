import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const collections = [
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
        <button className="border-none py-2 px-3 bg-[#FFEBBB] rounded-sm uppercase">
          shop now
        </button>
        <Typography variant="h5">{props.item.text}</Typography>
      </Box>
    </Box>
  );
}

const Home = () => {
  return (
    <>
      <Typography className=" text-center my-6" variant="h3">
        Beau - Paris
      </Typography>
      <Box className="mb-12">
        <Divider className="mb-[1px]" />
        <Divider />

        <Accordion className="mb-[1px]">
          <AccordionSummary
            expandIcon={<DensityMediumIcon className="text-base" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            MENU
          </AccordionSummary>
          <AccordionDetails>detail</AccordionDetails>
        </Accordion>
        {/* <Divider className="mb-[1px]" /> */}
        <Divider />
      </Box>

      <Carousel animation="slide" duration={550}>
        {carouselHomePage.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <Box className="px-5">
        {collections.map((item) => (
          <Box className="mb-5">
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

      <Box className="px-5">
        <Box className="border-y-[1px] border-x-0 border-solid border-zinc-400 mb-5">
          <Typography variant="h5" className="text-center text-[#003872] py-2">
            Blog Post
          </Typography>
        </Box>
        <Box>
          {posts.map((item, idx) => (
            <Box key={idx} className="mb-9 flex flex-col gap-6">
              <img src={item.url} alt="" className="w-full" />
              <Typography variant="h5" className="text-[#003872] ">
                {item.title}
              </Typography>
              <Typography className="text-zinc-400">{item.date}</Typography>
              <Typography className="">{item.description}</Typography>
              <Box className="flex text-zinc-500">
                <Typography>Continue Reading </Typography>
                <NavigateNextIcon />
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
          <Box className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First name"
              className="border border-zinc-300 h-10 px-3 rounded-sm"
            />
            <input
              type="text"
              placeholder="Last name"
              className="border border-zinc-300 h-10 px-3 rounded-sm"
            />

            <input
              type="text"
              placeholder="Email"
              className="border border-zinc-300 h-10 px-3 rounded-sm"
            />
            <button className="uppercase border-none bg-[#FFEBBB] h-10 rounded-sm">
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

export default Home;
