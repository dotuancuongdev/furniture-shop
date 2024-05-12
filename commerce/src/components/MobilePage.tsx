import { Box, Typography } from "@mui/material";
import Download from "../assets/download-from-store.png";

const MobilePage = () => (
  <Box className="flex justify-center items-center flex-col min-h-screen">
    <img src={Download} className="w-[80%] max-w-64" />
    <Typography variant="h6" className="text-center">
      or visit using Desktop version
    </Typography>
  </Box>
);

export default MobilePage;
