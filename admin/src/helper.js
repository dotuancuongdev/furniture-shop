import { TOKEN, USER } from "./constants";

export const handleLogOut = () => {
  localStorage.removeItem(USER);
  localStorage.removeItem(TOKEN);
  window.location.href = "/";
};
