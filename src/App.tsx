import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./Pages/HomeScreen/HomeLayout";
import MoreCustomScreen from "./Pages/MoreCustomScreen";
import Dashboard from "./Pages/Dashboard/Index";
import Login from "./Pages/Login";
import Journal from "./Pages/Journal Books";
import MyAccount from "./Pages/MyAccount";
import Cart from "./Pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/customise"
          element={<HomeScreen curimage={require("./assests/default.png")} />}
        />
        <Route path="/customise/:id" element={<HomeScreen />} />
        <Route path="morecustomization" element={<MoreCustomScreen />} />
        <Route path="/" element={<Dashboard />} />

        <Route path="/journal" element={<Journal bookType="JournalBooks" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/writing"
          element={<Journal bookType="WritingJournal" />}
        />
        <Route path="/shop" element={<Journal bookType="Others" />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
