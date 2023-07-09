import GifOptions from "./GifOptions";
import Form from "./Form";
import Footer from "./Footer";
import { Link, Route, Routes } from "react-router-dom";
import React, { useState } from "react";


function Home() {
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
    <>
      <div className="homeContainer">
        <Form
          trackValue={trackValue}
          setTrackValue={setTrackValue}
          handleSearch={handleSearch}
        />
        <div className="wrapper">
          <GifOptions searchTerm={searchTerm} />
        </div>
      </div>
      <Footer className="homeFooter"/> 
      
    </>
  );
}

export default Home; 