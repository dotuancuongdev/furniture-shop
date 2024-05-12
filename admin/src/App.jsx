import { useContext, useState } from "react";

import "./App.css";
import Login from "./pages/Login";

import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AppContext } from "./context";
import Admin from "./pages/Admin";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Categories from "./pages/Categories";
import CreateCategory from "./pages/CreateCategory";
import CreateProduct from "./pages/CreateProduct";
import EditCategory from "./pages/EditCategory";
import Products from "./pages/Products";
import EditPrd from "./pages/EditPrd";
import Order from "./pages/Order";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { handleLogOut } from "./helper";
import MobilePage from "./components/MobilePage";

const adminRoutes = [
  { path: "/", element: <Admin /> },
  { path: "/category", element: <Categories /> },
  { path: "/category/create", element: <CreateCategory /> },
  { path: "/category/edit/:id", element: <EditCategory /> },
  { path: "/product", element: <Products /> },
  { path: "/product/create/", element: <CreateProduct /> },
  { path: "/product/edit/:id", element: <EditPrd /> },
  { path: "/order", element: <Order /> },
];

const authRoutes = [{ path: "/", element: <Login /> }];

const drawerNav = [
  { name: "Products", icon: <AllInboxIcon />, url: "/product" },
  { name: "Categories", icon: <CategoryIcon />, url: "/category" },
  { name: "Orders", icon: <ReceiptIcon />, url: "/order" },
];

const AppSnackbar = () => {
  const appContext = useContext(AppContext);
  const { snackbar, setSnackbar } = appContext;
  const { isOpen, message, severity } = snackbar;

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ isOpen: false, message: "", severity: "" });
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

const AppLoading = () => {
  const { loading } = useContext(AppContext);

  return (
    <Box
      className={`flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-zinc-900 opacity-80 z-[9999] ${
        !loading ? "hidden" : ""
      }`}
    >
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="secondary" className="text-green-400" />
      </Stack>
    </Box>
  );
};

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function App() {
  const appContext = useContext(AppContext);
  const { user } = appContext;
  const matches = useMediaQuery("(min-width:900px)");

  return matches ? (
    <BrowserRouter>
      <AppLoading />
      <AppSnackbar />
      {user ? <AdminLayout /> : <AuthLayout />}
    </BrowserRouter>
  ) : (
    <MobilePage />
  );
}

const AuthLayout = () => (
  <Routes>
    {authRoutes.map((r, idx) => (
      <Route key={idx} path={r.path} element={r.element} />
    ))}
    <Route path="/*" element={<Navigate to="/" replace />} />
  </Routes>
);

const AdminLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const appContext = useContext(AppContext);
  const { header } = appContext;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileMenu = !!anchorEl;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAccountLogoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountLogoClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar className="flex justify-between">
          <Box className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Furniture Admin Dashboard
            </Typography>
          </Box>
          <Box>
            <Button onClick={handleAccountLogoClick}>
              <AccountCircleIcon className="text-white" />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openProfileMenu}
              onClose={handleAccountLogoClose}
            >
              <MenuItem onClick={handleAccountLogoClose}>Profile</MenuItem>
              <MenuItem onClick={handleAccountLogoClose}>My account</MenuItem>
              <MenuItem
                onClick={() => {
                  handleAccountLogoClose();
                  handleLogOut();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerNav.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.url);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        style={{
          flexGrow: 1,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `-${drawerWidth}px`,
          ...(open && {
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          }),
        }}
      >
        <DrawerHeader />
        <Box className="p-4 min-h-[calc(100vh-64px)]">
          <Typography variant="h5">{header}</Typography>
          <Divider className="my-3" />
          <Routes>
            {adminRoutes.map((r, idx) => (
              <Route key={idx} path={r.path} element={r.element} />
            ))}
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
