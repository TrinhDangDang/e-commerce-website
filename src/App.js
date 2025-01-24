import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import Cart from "./Components/Cart";
import Pencils from "./Components/Pencils";
import Scissors from "./Components/Scissors";
import Notebooks from "./Components/Notebooks";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="notebooks" element={<Notebooks />} />
          <Route path="pencils" element={<Pencils />} />
          <Route path="scissors" element={<Scissors />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
