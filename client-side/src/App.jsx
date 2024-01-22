import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sale from "./pages/Sale/Sale.jsx";
import Stock from "./pages/Stock/Stock";
import AddStock from "./pages/AddStock/AddStock";
import Analysis from "./pages/Analysis/Analysis";
import History from "./pages/History/History";
import { jwtDecode } from "./services/jwtDecode.js";
import { getLocalStorage } from "./services/storage.js";

function App() {

  const  user = jwtDecode(getLocalStorage("refreshToken"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Sale /> : <Login />} />
        <Route path="/view-stock" element={user ? <Stock /> : <Login />} />
        <Route
          path="/add-product"
          element={user ? <AddStock /> : <Login />}
        />
        <Route
          path="/analysis"
          element={user ? <Analysis /> : <Login />}
        />
        <Route path="/history" element={user ? <History /> : <Login />} />
        <Route path="/login" element={user ? <Login /> : <Login />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
