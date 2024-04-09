export const formatPrice = (x) => {
  return x.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export function shortenString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength) + "...";
  }
}

export function convertDate(d) {
  const date = new Date(d);
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return formattedDate;
}
