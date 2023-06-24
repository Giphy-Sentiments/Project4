import React, { useState } from 'react';
import './App.css';
import Form from './components/Form.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import GifOptions from './components/GifOptions';

function App() {
  // declared two state variables to represent the emotion and search term to be used for searching gif & set value as empty string 

  // this tracks the value of the input 
  const [trackValue, setTrackValue] = useState("");
  
  // user submitted input 
  const [searchTerm, setSearchTerm] = useState("");

  // count for number of times search button is clicked
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(trackValue);
    setSearchCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="App">
      <Header/>
      <Form 
        trackValue={trackValue} 
        setTrackValue={setTrackValue} 
        handleSearch={handleSearch}
      />
      <GifOptions searchTerm={searchTerm} searchCount={searchCount} />
      <Footer/>
    </div>
  );
}

export default App;
