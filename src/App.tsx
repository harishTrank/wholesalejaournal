import React from "react";
import HomeScreen from "./Pages/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoreCustomScreen from "./Pages/MoreCustomScreen";

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
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
