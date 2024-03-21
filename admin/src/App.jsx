import { useContext, useState } from "react";

import "./App.css";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import { AppContext } from "./context";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Categories from "./pages/Categories";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import CreateProduct from "./pages/CreateProduct";

import * as React from "react";
import { handleLogOut } from "./helper";

import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const admin = createBrowserRouter([
  { path: "/", element: <Admin /> },
  { path: "/category", element: <Categories /> },
  { path: "/category/create", element: <CreateCategory /> },
  { path: "/category/edit/:id", element: <EditCategory /> },
  { path: "/product/create/", element: <CreateProduct /> },

  { path: "/*", element: <Navigate to="/" replace /> },
]);
const auth = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/*", element: <Navigate to="/" replace /> },
]);

const drawer = [
  { id: 1, name: "Products", icon: <AllInboxIcon />, url: "/product" },
  { id: 2, name: "Categories", icon: <CategoryIcon />, url: "/category" },
  { id: 3, name: "Orders", icon: <ReceiptIcon />, url: "/order" },
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

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
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
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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
}));

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
  const theme = useTheme();

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
    <>
      <AppLoading />
      <AppSnackbar />
      {user ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
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
                  Persistent drawer
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
                  <MenuItem onClick={handleAccountLogoClose}>
                    My account
                  </MenuItem>
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
              {drawer.map((item, index) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />

            <RouterProvider router={admin} />
          </Main>
        </Box>
      ) : (
        <RouterProvider router={auth} />
      )}
    </>
  );
}

export default App;
