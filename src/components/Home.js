import GifOptions from "./GifOptions";
import Form from "./Form";
import React, { useState } from "react";


function Home() {

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
    </>
  );
}

export default Home; 