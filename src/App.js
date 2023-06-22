import React, { useState } from 'react';
import './App.css';
import Form from './components/Form.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import GifOptions from './components/GifOptions';

function App() {
  const [gifEmotion, setGifEmotion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(gifEmotion);
  };

  return (
    <div className="App">
      <Header/>
      <Form 
        gifEmotion={gifEmotion} 
        setGifEmotion={setGifEmotion} 
        handleSearch={handleSearch}
      />
      <GifOptions searchTerm={searchTerm}/>
      <Footer/>
    </div>
  );
}


export default App;
