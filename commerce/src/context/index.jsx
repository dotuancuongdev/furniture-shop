import { createContext, useState } from "react";

export const AppContext = createContext(null);
const AppProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: ``,
    severity: "",
  });
  const [loading, setLoading] = useState(false);
  return (
    <AppContext.Provider value={{ snackbar, setSnackbar, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
