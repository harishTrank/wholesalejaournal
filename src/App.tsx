import React from "react";
import HomeScreen from "./Pages/HomeScreen/HomeLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoreCustomScreen from "./Pages/MoreCustomScreen";
import Dashboard from "./Pages/Dashboard/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route
          index
          element={<HomeScreen curimage={require("./assests/dummyimg.jpg")} />}
        />
        <Route path="more-customization" element={<MoreCustomScreen />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
