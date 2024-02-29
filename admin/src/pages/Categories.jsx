import React, { useEffect, useState } from "react";
import api from "../api";
import {
  Box,
  Button,
  FormControl,
  Input,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "../constants";

let totalPages;
let totalItems;
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [pageNumberInput, setPageNumberInput] = useState(`${pageNumber}`);
  useEffect(() => {
    let ignore = false;
    const getCategories = async () => {
      try {
        const respone = await api.get(
          `/categories?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        if (!ignore) {
          console.log(respone);
          setCategories(respone.data.items);

          totalPages = respone.data.totalPages;
          totalItems = respone.data.totalItems;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    return () => {
      ignore = true;
    };
  }, [pageSize, pageNumber]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

  const handleChangePageSize = (e) => {
    setPageSize(e.target.value);
    setPageNumber(1);
    setPageNumberInput(`1`);
  };

  const handleChangePageNumber = (e) => {
    setPageNumberInput(e.target.value);
  };
  const handleEnterPageNumber = (e) => {
    if (e.keyCode === 13) {
      if (!pageNumberInput || parseInt(pageNumberInput) > totalPages) {
        setPageNumberInput("1");
        setPageNumber(1);
        return;
      }

      setPageNumber(parseInt(pageNumberInput));
    }
  };
  const handleNextPage = () => {
    if (pageNumber === totalPages) return;
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);

    setPageNumberInput(`${nextPage}`);
  };
  const handlePrevPage = () => {
    if (pageNumber === 1) return;
    const prevPage = pageNumber - 1;
    setPageNumber(prevPage);
    setPageNumberInput(`${prevPage}`);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((c, idx) => (
              <StyledTableRow key={c.name}>
                <StyledTableCell>
                  {(pageNumber - 1) * pageSize + idx + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {c.name}
                </StyledTableCell>
                <StyledTableCell>
                  <EditIcon className="cursor-pointer text-zinc-500 hover:text-black" />
                </StyledTableCell>
                <StyledTableCell>
                  <DeleteForeverIcon className="cursor-pointer text-red-400 hover:text-red-500" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="flex justify-end">
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
            label="PageNumber"
            type="number"
            className=" "
            value={pageNumberInput}
            onChange={handleChangePageNumber}
            onKeyDown={handleEnterPageNumber}
          />

          <Typography>/ {totalPages} Pages</Typography>
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
  );
};

export default Categories;
