import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LoopIcon from "@mui/icons-material/Loop";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const quickLinks = ["Theme Info", "FAQs", "Search"];
const paymentMethodLogos = [
  "https://static.vecteezy.com/system/resources/previews/020/975/570/non_2x/visa-logo-visa-icon-transparent-free-png.png",
  "https://static-00.iconduck.com/assets.00/amex-icon-1024x666-5rlm5d50.png",
  "https://www.logo.wine/a/logo/Mastercard/Mastercard-Logo.wine.svg",
  "https://1000logos.net/wp-content/uploads/2021/05/Discover-logo.png",
  "https://pngimg.com/uploads/paypal/paypal_PNG25.png",
];
const Footer = () => {
  return (
    <Box className="">
      <Box className="text-center">
        <Typography variant="h5" className="mb-7">
          Quick Links
        </Typography>
        <ul className="text-zinc-400 text-sm mb-7 flex flex-col gap-3">
          {quickLinks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Box>
      <Box className="text-center mb-7">
        <Typography variant="h5" className="mb-7">
          Theme Info
        </Typography>
        <Typography className="text-zinc-400 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
          <i>
            <strong>Lorem Ipsum</strong>
          </i>
          has been the industry's standard dummy text ever since the 1500s.
        </Typography>
        <Typography className="text-zinc-400 text-sm">
          Redfield@robertredfield
        </Typography>
      </Box>
      <Box className="h-[1px] bg-black w-5/6 mx-auto mb-5"></Box>
      <Box className="border border-solid border-zinc-400 rounded-sm py-3 w-1/2 mx-auto text-center flex justify-center gap-3 mb-7">
        <Typography className="uppercase">vietnam (cad $)</Typography>
        <KeyboardArrowDownIcon />
      </Box>
      <Typography className="text-zinc-400 text-sm text-center mb-7">
        © 2024 Sephora USA, Inc. All rights reserved.
      </Typography>
      <Box className="flex justify-center items-center gap-5">
        {paymentMethodLogos.map((item) => (
          <img key={item} src={item} alt="" className="w-10  object-cover" />
        ))}
      </Box>
    </Box>
  );

  // return (
  //   <Box>
  //     <Box className="flex  my-5">
  //       {policies.map((item, idx) => (
  //         <Box
  //           key={idx}
  //           className="flex-1 py-5 text-zinc-700 flex flex-col justify-center items-center hover:bg-slate-100 duration-200"
  //         >
  //           {item.icon}
  //           <Typography className="text-2xl">{item.text1}</Typography>
  //           <Typography>{item.text2}</Typography>
  //         </Box>
  //       ))}
  //     </Box>
  //     <Box className="bg-slate-200 flex p-5 gap-5 ">
  //       <Box className="flex-1 ">
  //         <Typography variant="h5" className="uppercase mb-2">
  //           Nội thất
  //         </Typography>
  //         <Typography>
  //           Là thương hiệu đến từ Savimex với gần 40 năm kinh nghiệm trong việc
  //           sản xuất và xuất khẩu nội thất đạt chuẩn quốc tế.
  //         </Typography>
  //       </Box>
  //       <Box className="flex-1 ">
  //         <Typography variant="h5" className="uppercase mb-2">
  //           dịch vụ
  //         </Typography>

  //         <Typography className="cursor-pointer">
  //           Chính sách bán hàng
  //         </Typography>
  //         <Typography className="cursor-pointer">
  //           Chính sách giao hàng & lắp đặt
  //         </Typography>
  //         <Typography className="cursor-pointer">Chính sách đổi trả</Typography>
  //         <Typography className="cursor-pointer">
  //           Chính sách bảo hành
  //         </Typography>
  //       </Box>
  //       <Box className="flex-1 ">
  //         <Typography variant="h5" className="uppercase mb-2">
  //           thông tin liên hệ
  //         </Typography>
  //         <Box className="flex gap-2">
  //           <LocationOnIcon />
  //           <Typography>Thanh Xuân - Hà Nội</Typography>
  //         </Box>
  //         <Box className="flex gap-2">
  //           <LocationOnIcon />
  //           <Typography>Quận 1 - TP.HCM</Typography>
  //         </Box>
  //         <Box className="flex gap-2">
  //           <LocalPhoneIcon />
  //           <Typography>0987 654 321</Typography>
  //         </Box>
  //         <Box className="flex gap-2">
  //           <EmailIcon />
  //           <Typography>ecommerce@gmail.com</Typography>
  //         </Box>
  //       </Box>
  //       <Box className="flex-1 ">
  //         <Typography variant="h5" className="uppercase mb-2">
  //           fanpage
  //         </Typography>
  //         <Box className="flex gap-2 cursor-pointer">
  //           <FacebookIcon color="info" />
  //           <Typography>Facebook</Typography>
  //         </Box>
  //         <Box className="flex gap-2 cursor-pointer">
  //           <YouTubeIcon color="error" />
  //           <Typography>Youtube</Typography>
  //         </Box>
  //         <Box className="flex gap-2 cursor-pointer">
  //           <InstagramIcon color="action" />
  //           <Typography>Instagram</Typography>
  //         </Box>
  //       </Box>
  //     </Box>
  //   </Box>
  // );
};

export default Footer;
