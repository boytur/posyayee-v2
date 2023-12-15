import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sale from "./components/Sale/Sale";
import Stock from "./components/Stock/Stock";
import AddStock from "./components/AddStock/AddStock";
import Analysis from "./components/Analysis/Analysis";
import History from "./components/History/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sale-product" element={<Sale />} />
        <Route path="/view-stock" element={<Stock />} />
        <Route path="/add-product" element={<AddStock />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;