import React, { createContext, useState } from "react";
import { USER } from "../constants";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: ``,
    severity: "",
  });
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState("");

  try {
    const localUser = localStorage.getItem(USER);
    const parseUser = JSON.parse(localUser);
    if (parseUser && !user) {
      setUser(parseUser);
    }
  } catch {}

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        snackbar,
        setSnackbar,
        loading,
        setLoading,
        header,
        setHeader,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
