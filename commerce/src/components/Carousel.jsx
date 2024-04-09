import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const getTheItem = (page, size, items) => {
  let startIndex = (page * size) % items.length;

  const res = [items[startIndex]];

  for (let index = 2; index <= size; index++) {
    if (startIndex === items.length - 1) startIndex = 0;
    else startIndex++;
    res.push(items[startIndex]);
  }

  return res;
};

const itemsPerPage = 4;

function Carousel({ items }) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const renderItems = () => {
    return getTheItem(currentPage, itemsPerPage, items).map((item, index) => (
      <Grid item xs={3} key={index}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia component="img" height="140" image={item.img} />
            <CardContent className="flex flex-col h-36">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="inline-block w-[240px] whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {item.name}
              </Typography>
              {item.rate && (
                <Rating
                  name="read-only"
                  precision={0.2}
                  value={item.rate}
                  readOnly
                />
              )}

              <Typography
                variant="body2"
                color="text.secondary"
                className="flex-1 mb-1"
              >
                {item.text?.length > 125
                  ? `${item.text.slice(0, 125).trim()}...`
                  : item.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  };

  return (
    <div>
      <Grid container spacing={2}>
        {renderItems()}
      </Grid>
    </div>
  );
}

export default Carousel;
