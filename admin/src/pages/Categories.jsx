import React, { useContext, useEffect, useState } from "react";
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
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom";

let totalPages;
let totalItems;
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [pageNumberInput, setPageNumberInput] = useState(`${pageNumber}`);
  const appContext = useContext(AppContext);
  const { setSnackbar, setLoading } = appContext;
  const navigate = useNavigate();
  const emptyRowsCount = pageSize - categories.length;
  const emptyRows = Array(emptyRowsCount).fill(0);

  useEffect(() => {
    let ignore = false;
    const getCategories = async () => {
      try {
        setLoading(true);
        const respone = await api.get("/categories", {
          params: {
            pageSize,
            pageNumber,
          },
        });
        if (!ignore) {
          setCategories(respone.data.items);

          totalPages = respone.data.totalPages;
          totalItems = respone.data.totalItems;
        }
      } catch (error) {
        setSnackbar({
          isOpen: true,
          message: error.message,
          severity: "error",
        });
      } finally {
        setLoading(false);
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
  return categories.length === 0 ? (
    <Box>no data</Box>
  ) : (
    <>
      <Button
        variant="contained"
        className="bg-green-400"
        onClick={() => navigate(`/category/create`)}
      >
        create a new category
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((c, idx) => (
              <StyledTableRow key={c.id}>
                <StyledTableCell>
                  {(pageNumber - 1) * pageSize + idx + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {c.name}
                </StyledTableCell>
                <StyledTableCell>
                  {c.description?.length > 30
                    ? `${c.description.slice(0, 30).trim()}...`
                    : c.description}
                </StyledTableCell>
                <StyledTableCell>
                  <Box className="flex gap-1">
                    <EditIcon className="cursor-pointer text-zinc-500 hover:text-black" />
                    <DeleteForeverIcon className="cursor-pointer text-red-400 hover:text-red-500" />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows.map((c, idx) => (
              <StyledTableRow key={idx} className="h-[57px]">
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="flex justify-end items-center gap-2">
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
            className=" w-24 mr-2"
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
  );
};

export default Categories;
