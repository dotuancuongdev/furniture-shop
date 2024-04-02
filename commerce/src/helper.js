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
