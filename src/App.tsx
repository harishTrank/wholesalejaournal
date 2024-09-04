import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./Pages/HomeScreen/HomeLayout";
import MoreCustomScreen from "./Pages/MoreCustomScreen";
import Dashboard from "./Pages/Dashboard/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="image-editor"
          element={<HomeScreen curimage={require("./assests/dummyimg.jpg")} />}
        />
        <Route path="more-customization" element={<MoreCustomScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
