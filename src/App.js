import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import GifOptions from "./components/GifOptions";
import Timeline from "./components/Timeline";

function App() {
  // declared two state variables to represent the emotion and search term to be used for searching gif & set value as empty string

  // this tracks the value of the input
  const [trackValue, setTrackValue] = useState("");

  // user submitted input
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(trackValue);
    // reset input field
    setTrackValue("");
  };

  return (
    <div className="App">
      <Header />
      <Form
        trackValue={trackValue}
        setTrackValue={setTrackValue}
        handleSearch={handleSearch}
      />
      <GifOptions searchTerm={searchTerm} />
      <Timeline />
      <Footer />
    </div>
  );
}

export default App;
