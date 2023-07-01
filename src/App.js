import React, { useState } from 'react';
import './App.css';
import Form from './components/Form.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import GifOptions from './components/GifOptions';
import Timeline from './components/Timeline';

function App() {
  const [trackValue, setTrackValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(trackValue);
    setSearchCount((prevCount) => prevCount + 1);
    setTrackValue("");
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
      <Timeline />
      <Footer/>
    </div>
  );
}

export default App;
