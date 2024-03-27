import React from "react";
import { Box, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LoopIcon from "@mui/icons-material/Loop";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
const policies = [
  {
    id: 1,
    icon: <ShoppingCartCheckoutIcon className="text-5xl" />,
    text1: "Giao hàng & Lắp đặt",
    text2: "Miễn phí",
  },
  {
    id: 2,
    icon: <LoopIcon className="text-5xl" />,
    text1: "Đổi trả 1-1",
    text2: "Miễn phí",
  },
  {
    id: 3,
    icon: <LocalPoliceIcon className="text-5xl" />,
    text1: "Bảo hành 2 năm",
    text2: "Miễn phí",
  },
  {
    id: 4,
    icon: <LocalPhoneIcon className="text-5xl" />,
    text1: "Tư vấn thiết kế",
    text2: "Miễn phí",
  },
];
const Footer = () => {
  return (
    <Box>
      <Box className="flex  mt-7 mb-10">
        {policies.map((item, idx) => (
          <Box
            key={idx}
            className="flex-1 p-5 text-zinc-700 flex flex-col justify-center items-center hover:bg-slate-100 duration-200"
          >
            {item.icon}
            <Typography className="text-2xl">{item.text1}</Typography>
            <Typography>{item.text2}</Typography>
          </Box>
        ))}
      </Box>
      <Box className="bg-slate-200 flex p-5 gap-5 ">
        <Box className="flex-1 ">
          <Typography variant="h5" className="uppercase mb-2">
            Nội thất
          </Typography>
          <Typography>
            Là thương hiệu đến từ Savimex với gần 40 năm kinh nghiệm trong việc
            sản xuất và xuất khẩu nội thất đạt chuẩn quốc tế.
          </Typography>
        </Box>
        <Box className="flex-1 ">
          <Typography variant="h5" className="uppercase mb-2">
            dịch vụ
          </Typography>

          <Typography className="cursor-pointer">
            Chính sách bán hàng
          </Typography>
          <Typography className="cursor-pointer">
            Chính sách giao hàng & lắp đặt
          </Typography>
          <Typography className="cursor-pointer">Chính sách đổi trả</Typography>
          <Typography className="cursor-pointer">
            Chính sách bảo hành
          </Typography>
        </Box>
        <Box className="flex-1 ">
          <Typography variant="h5" className="uppercase mb-2">
            thông tin liên hệ
          </Typography>
          <Box className="flex gap-2">
            <LocationOnIcon />
            <Typography>Thanh Xuân - Hà Nội</Typography>
          </Box>
          <Box className="flex gap-2">
            <LocationOnIcon />
            <Typography>Quận 1 - TP.HCM</Typography>
          </Box>
          <Box className="flex gap-2">
            <LocalPhoneIcon />
            <Typography>0987 654 321</Typography>
          </Box>
          <Box className="flex gap-2">
            <EmailIcon />
            <Typography>ecommerce@gmail.com</Typography>
          </Box>
        </Box>
        <Box className="flex-1 ">
          <Typography variant="h5" className="uppercase mb-2">
            fanpage
          </Typography>
          <Box className="flex gap-2 cursor-pointer">
            <FacebookIcon color="info" />
            <Typography>Facebook</Typography>
          </Box>
          <Box className="flex gap-2 cursor-pointer">
            <YouTubeIcon color="error" />
            <Typography>Youtube</Typography>
          </Box>
          <Box className="flex gap-2 cursor-pointer">
            <InstagramIcon color="action" />
            <Typography>Instagram</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
