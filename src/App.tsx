import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./Pages/HomeScreen/HomeLayout";
import MoreCustomScreen from "./Pages/MoreCustomScreen";
import Dashboard from "./Pages/Dashboard/Index";
import Login from "./Pages/Login";
import Journal from "./Pages/Journal Books";
import Writing from "./Pages/Writing Journal";
import Shop from "./Pages/Shop";
import MyAccount from "./Pages/MyAccount";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/customise"
          element={<HomeScreen curimage={require("./assests/dummyimg.jpg")} />}
        />
        <Route path="morecustomization" element={<MoreCustomScreen />} />
        <Route path="/" element={<Dashboard />} />

        <Route path="/journal" element={<Journal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/journal" element={<Journal />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
