import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import GifOptions from "./components/GifOptions";
import Timeline from "./components/Timeline";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/timeline" element={<Timeline />}/>
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
