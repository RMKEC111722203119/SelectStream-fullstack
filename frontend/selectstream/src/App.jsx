import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/authentication/Login'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Routes,Route} from "react-router-dom";
import SignUp from './components/authentication/Signup'
import LandingPage from './components/LandingPage/LandingPage'
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

export default App
