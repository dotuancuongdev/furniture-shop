import { useContext, useState } from "react";

import "./App.css";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import { appContext } from "./context";

function App() {
  const userContext = useContext(appContext);
  const { user } = userContext;
  return <>{user ? <Admin /> : <Login />}</>;
}

export default App;
