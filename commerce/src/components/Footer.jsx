import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Typography } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const quickLinks = ["Contact", "FAQs", "Search"];
const paymentMethodLogos = [
  "https://static.vecteezy.com/system/resources/previews/020/975/570/non_2x/visa-logo-visa-icon-transparent-free-png.png",
  "https://static-00.iconduck.com/assets.00/amex-icon-1024x666-5rlm5d50.png",
  "https://www.logo.wine/a/logo/Mastercard/Mastercard-Logo.wine.svg",
  "https://1000logos.net/wp-content/uploads/2021/05/Discover-logo.png",
  "https://pngimg.com/uploads/paypal/paypal_PNG25.png",
];
const Footer = () => {
  return (
    <Box className="py-8 mt-7 xl:px-48  border-t border-solid border-t-zinc-200 border-l-0 border-r-0 border-b-0">
      <Box className="w-5/6 mx-auto xl:flex justify-between">
        <Box className="text-center xl:flex-1">
          <Typography variant="h5" className="mb-7">
            Quick Links
          </Typography>
          <ul className="text-zinc-400 text-sm mb-7 flex flex-col gap-3">
            {quickLinks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Box>
        <Box className="flex-[2]"></Box>
        <Box className="text-center mb-7 xl:flex-1">
          <Typography variant="h5" className="mb-7">
            Contact us
          </Typography>
          <Box className="flex flex-col items-center gap-3 text-zinc-400">
            <Box className="flex items-center gap-1">
              <XIcon className="text-sm" />
              <Typography className="text-sm">Twitter</Typography>
            </Box>
            <Box className="flex items-center gap-1">
              <FacebookIcon className="text-sm" />
              <Typography className="text-sm">Facebook</Typography>
            </Box>
            <Box className="flex items-center gap-1">
              <InstagramIcon className="text-sm" />
              <Typography className="text-sm">Instagram</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="h-[1px] bg-zinc-400 w-4/5 xl:w-full mx-auto mb-5"></Box>
      <Box className="border border-solid border-zinc-400 rounded-sm py-3 w-1/2 mx-auto text-center flex justify-center gap-3 mb-7 xl:w-1/4">
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
