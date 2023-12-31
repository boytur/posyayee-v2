import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sale from "./pages/Sale/Sale.jsx";
import Stock from "./pages/Stock/Stock";
import AddStock from "./pages/AddStock/AddStock";
import Analysis from "./pages/Analysis/Analysis";
import History from "./pages/History/History";
import Login from "./pages/Login/Login";
import NewStore from "./components/ChooseSeller/NewStore";
import ChooseSeller from "./components/ChooseSeller/ChooseSeller";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "./config.js";

const API = import.meta.env.VITE_API_KEY;

function App() {
  const [isLogedIn, setIsLoggedIn] = useState(false);

  const protectRoute = async () => {
    try {
      await axios.get(`${API}`, config).then((res) => {
        setIsLoggedIn(res.data.success);
        if (res.data.success) {
          sessionStorage.setItem("isLogedIn", true);
        }
      });
    } catch (err) {
      if (err) {
        return;
      }
    }
  };

  useEffect(() => {
    protectRoute();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogedIn ? <Sale /> : <Login />} />
        <Route path="/view-stock" element={isLogedIn ? <Stock /> : <Login />} />
        <Route
          path="/add-product"
          element={isLogedIn ? <AddStock /> : <Login />}
        />
        <Route
          path="/analysis"
          element={isLogedIn ? <Analysis /> : <Login />}
        />
        <Route path="/history" element={isLogedIn ? <History /> : <Login />} />
        <Route
          path="/new-store"
          element={isLogedIn ? <NewStore /> : <Login />}
        />
        <Route
          path="/choose-seller"
          element={isLogedIn ? <ChooseSeller /> : <Login />}
        />
        <Route path="/login" element={isLogedIn ? <Login /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;