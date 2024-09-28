import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/Signup";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-register" element={<SignUp />} />
        <Route path="/selectstream" element={<LandingPage />} />
        
      </Routes>
    </>
  );
}

export default App;
