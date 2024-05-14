import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "../constants";
import { AppContext } from "../context";

import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { convertDate, formatPrice } from "../helper";
let totalPages;
let totalItems;

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [pageNumberInput, setPageNumberInput] = useState(`${pageNumber}`);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [openModal, setOpenModal] = useState(false);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, setHeader } = appContext;

  let emptyRowsCount =
    pageSize - orders.length < 0 ? 1 : pageSize - orders.length;
  const emptyRows = Array(emptyRowsCount).fill(0);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };

  const handleGetOrderDetail = async (id) => {
    setOpenModal(true);
    try {
      const res = await api.get(`/orders/${id}`);
      setOrderDetail(res.data);
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    let ignore = false;
    const getOrders = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/orders`, {
          params: {
            pageSize,
            pageNumber,
          },
        });
        if (!ignore) {
          setOrders(res.data.items);
          totalPages = res.data.totalPages;
        }
        setLoading(false);
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
        setLoading(false);
      }
    };

    getOrders();
    return () => {
      ignore = true;
    };
  }, [pageNumber, pageSize]);

  const handleChangePageSize = (e) => {
    setPageSize(e.target.value);
    setPageNumber(1);
    setPageNumberInput(`1`);
  };

  const handlePrevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
    setPageNumberInput(`${pageNumber - 1}`);
  };

  const handleNextPage = () => {
    if (pageNumber === totalPages) return;
    setPageNumber(pageNumber + 1);
    setPageNumberInput(`${pageNumber + 1}`);
  };

  const handleChangePageNumber = (e) => {
    setPageNumberInput(e.target.value);
  };
  const handleEnterPageNumber = (e) => {
    if (e.keyCode === 13) {
      if (!pageNumberInput || parseInt(pageNumberInput) > totalPages) {
        return;
      }

      setPageNumber(parseInt(pageNumberInput));
    }
  };

  useEffect(() => {
    setHeader("Order List");
  }, []);

  return (
    orders.length > 0 && (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, idx) => (
                <StyledTableRow key={order._id}>
                  <StyledTableCell>
                    {(pageNumber - 1) * pageSize + idx + 1}
                  </StyledTableCell>
                  <StyledTableCell>{order.name}</StyledTableCell>
                  <StyledTableCell>{order.phone}</StyledTableCell>
                  <StyledTableCell>{order.email}</StyledTableCell>
                  <StyledTableCell>{order.cityName}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={() => handleGetOrderDetail(order._id)}
                      variant="contained"
                    >
                      <VisibilityIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {pageNumber !== 1 &&
                emptyRows.map((c, idx) => (
                  <StyledTableRow key={idx} className="h-[68.8px]">
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box className="mt-3 flex justify-end items-center gap-2">
          <Typography>Total {totalItems} items</Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">PageSize</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={pageSize}
              label="PageSize"
              onChange={handleChangePageSize}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className="flex justify-center items-center">
            <Button
              className="text-zinc-700 hover:text-black"
              disabled={pageNumber === 1}
              onClick={handlePrevPage}
            >
              <NavigateBeforeIcon />
            </Button>
            <TextField
              size="small"
              // label="PageNumber"
              type="number"
              className=" w-16 mr-2"
              value={pageNumberInput}
              onChange={handleChangePageNumber}
              onKeyDown={handleEnterPageNumber}
            />

            <Typography>of {totalPages} Pages</Typography>
            <Button
              className="text-black"
              disabled={pageNumber === totalPages}
              onClick={handleNextPage}
            >
              <NavigateNextIcon />
            </Button>
          </Box>
        </Box>
        {orderDetail && (
          <Box>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openModal}
              onClose={handleCloseModal}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={openModal}>
                <Box sx={styleModal}>
                  <Typography>Name: {orderDetail.name}</Typography>
                  <Typography>Phone: {orderDetail.phone}</Typography>
                  <Typography>Email: {orderDetail.email}</Typography>
                  <Typography>
                    Address: {orderDetail.address} - {orderDetail.cityName}
                  </Typography>
                  <Typography>
                    Create Date: {convertDate(orderDetail.createdDate)}
                  </Typography>
                  <Typography>Status: {orderDetail.status}</Typography>

                  {/* {orderDetail.products.map((item, idx) => (
                    <Box key={idx} className="flex">
                      <Typography>{item._id}</Typography>
                      <Typography>{formatPrice(item.price)}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Divider />
                    </Box>
                  ))} */}
                </Box>
              </Fade>
            </Modal>
          </Box>
        )}
      </>
    )
  );
};

export default Order;
