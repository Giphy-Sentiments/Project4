import React, { useState } from 'react';
import './App.css';
import Form from './components/Form.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import GifOptions from './components/GifOptions';

function App() {
  // trackValue stores the current value of the search box
  const [trackValue, setTrackValue] = useState("");

  // searchTerm is the term used to perform the search
  const [searchTerm, setSearchTerm] = useState("");

  // searchCount keeps track of the number of times a search has been performed
  const [searchCount, setSearchCount] = useState(0);

// handleSearch is a function that will be called when a search is triggered, for instance when the form is submitted.
const handleSearch = (e) => {
  // e.preventDefault() is a function that prevents the default behavior of the browser. 
  // In this case, it prevents the page from reloading when the form is submitted.
  e.preventDefault();

  // setSearchTerm(trackValue) sets the searchTerm state to be the current value of the trackValue state.
  // This is because when the form is submitted, whatever is in the search box (trackValue) should be used as the searchTerm for fetching GIFs.
  setSearchTerm(trackValue);

  // setSearchCount((prevCount) => prevCount + 1) increments the searchCount state by one. 
  // searchCount state is used to keep track of the number of times a search has been performed.

  // searchCount serves as a kind of "signal" that tells the useEffect hook in the GifOptions component to rerun whenever a new search is submitted. SearchCount is incremented each time the search form is submitted, triggering the useEffect hook in GifOptions because searchCount is a dependency of that hook.This useEffect hook runs any time either searchTerm or searchCount changes. By incrementing searchCount on each form submission, we ensure that this effect runs again, resetting the state and fetching new GIFs based on the updated search term. If we didn't increment searchCount, then the effect wouldn't run if the search term remained the same between submissions. This allows the user to "refresh" the GIF search even if they're searching for the same term multiple times.
  setSearchCount((prevCount) => prevCount + 1);

  // setTrackValue("") resets the trackValue state (which holds the current value of the input field) to an empty string. 
  // This effectively clears the input box after the form is submitted, providing a better user experience.
  setTrackValue("");
};
// This function controls the behavior of the application when a new search is performed. It updates several pieces of state to reflect the new search, and prepares the application for displaying the new results.



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
