import { TOKEN, USER } from "./constants";

export const handleLogOut = () => {
  localStorage.removeItem(USER);
  localStorage.removeItem(TOKEN);
  window.location.href = "/";
};

export function convertDate(d) {
  const date = new Date(d);
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return formattedDate;
}
