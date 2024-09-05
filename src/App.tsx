import React from "react";
import HomeScreen from "./Pages/HomeScreen/HomeLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoreCustomScreen from "./Pages/MoreCustomScreen";
import Dashboard from "./Pages/Dashboard/Index"
import Login from './Pages/Login'
import Journal from './Pages/Journal Books'
function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route
          
          path="/customise"
          element={<HomeScreen curimage={require("./assests/dummyimg.jpg")} />}
        />
        <Route path="morecustomization" element={<MoreCustomScreen />} />
        <Route  path="/" element={<Dashboard />} />
        
       
        <Route path="/journal" element={<Journal/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
