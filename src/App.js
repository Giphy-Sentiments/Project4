import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Timeline from "./components/Timeline";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.js"
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
