import React, { createContext, useState } from "react";
import { USER } from "../constants";

export const appContext = createContext(null);

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  try {
    const localUser = localStorage.getItem(USER);
    const parseUser = JSON.parse(localUser);
    if (parseUser && !user) {
      setUser(parseUser);
    }
  } catch {}
  return (
    <appContext.Provider value={{ user, setUser }}>
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
