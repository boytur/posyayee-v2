// App.jsx
import { useAuth } from "./contexts/AuthProvider";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sale from "./pages/Sale/Sale.jsx";
import Stock from "./pages/Stock/Stock";
import AddStock from "./pages/AddStock/AddStock";
import Analysis from "./pages/Analysis/Analysis";
import History from "./pages/History/History";

function App() {
  const { storeName } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={storeName ? <Sale /> : <Login />} />
        <Route path="/view-stock" element={storeName ? <Stock /> : <Login />} />
        <Route
          path="/add-product"
          element={storeName ? <AddStock /> : <Login />}
        />
        <Route
          path="/analysis"
          element={storeName ? <Analysis /> : <Login />}
        />
        <Route path="/history" element={storeName ? <History /> : <Login />} />
        <Route path="/login" element={storeName ? <Login /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
