import { createContext, useEffect, useState } from "react";
import { CART } from "../constants";

export const AppContext = createContext(null);
let initCart = [];
try {
  const localCart = localStorage.getItem(CART);
  const parseCart = JSON.parse(localCart);
  if (parseCart) {
    initCart = parseCart;
  }
} catch {}

const AppProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: ``,
    severity: "",
  });
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(initCart);
  useEffect(() => {
    localStorage.setItem(CART, JSON.stringify(cart));
  }, [cart]);
  return (
    <AppContext.Provider
      value={{ snackbar, setSnackbar, loading, setLoading, cart, setCart }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
