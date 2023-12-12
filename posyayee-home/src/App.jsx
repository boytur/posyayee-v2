import Documentation from "./components/Documentation/Documentation";
import Home from "./components/Home/Home";
import Price from "./components/Price/Price";
import Contact from "./components/Contact/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Review from "./components/Review/Review";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/price" element={<Price />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/news" element={<Review />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
