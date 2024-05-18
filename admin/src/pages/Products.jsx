import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "../constants";
import { AppContext } from "../context";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { useNavigate } from "react-router-dom";

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

let totalPages;
let totalItems;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [pageNumberInput, setPageNumberInput] = useState(`${pageNumber}`);

  const appContext = useContext(AppContext);
  const { setLoading, setSnackbar, setHeader } = appContext;

  const navigate = useNavigate();

  let emptyRowsCount =
    pageSize - products.length < 0 ? 1 : pageSize - products.length;
  const emptyRows = Array(emptyRowsCount).fill(0);

  useEffect(() => {
    let ignore = false;
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products`, {
          params: { pageSize, pageNumber },
        });

        setProducts(response.data.items);
        totalItems = response.data.totalItems;
        totalPages = response.data.totalPages;
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

    getProducts();

    return () => {
      ignore = true;
    };
  }, [pageNumber, pageSize]);

  const handleChangePageSize = (e) => {
    setPageSize(e.target.value);
  };

  const handleChangePageNumber = (e) => {
    setPageNumberInput(e.target.value);
  };

  const handleEnterPageNumber = (e) => {
    if (e.key === "Enter") {
      if (!pageNumberInput || parseInt(pageNumberInput) > totalPages) return;
      setPageNumber(parseInt(pageNumberInput));
    }
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

  useEffect(() => {
    setHeader("Product List");
  }, []);

  return (
    products.length > 0 && (
      <>
        <Box className="flex justify-end mb-5">
          <Button
            variant="contained"
            className="bg-green-500 flex justify-center items-center"
            onClick={() => navigate(`/product/create`)}
          >
            <AddIcon className="text-xl mr-1" />
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Stock</StyledTableCell>
                <StyledTableCell>Operations</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((prd, idx) => (
                <StyledTableRow key={prd._id}>
                  <StyledTableCell>
                    {(pageNumber - 1) * pageSize + idx + 1}
                  </StyledTableCell>
                  <StyledTableCell>{prd.name}</StyledTableCell>
                  <StyledTableCell align="center">{prd.price}</StyledTableCell>
                  <StyledTableCell align="center">{prd.stock}</StyledTableCell>

                  <StyledTableCell>
                    <Box className="flex gap-1">
                      <Button
                        variant="contained"
                        className=""
                        onClick={() => navigate(`/product/edit/${prd._id}`)}
                      >
                        <EditIcon className=" " />
                      </Button>
                      <Button variant="contained" className="bg-red-600">
                        <DeleteForeverIcon className=" " />
                      </Button>
                    </Box>
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
      </>
    )
  );
};

export default Products;
