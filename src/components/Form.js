import React from 'react';

function Form({ trackValue, setTrackValue, handleSearch }) {

  const handleInputChange = (event) => {
    setTrackValue(event.target.value);
  };

  return (
    <div className='formContainer'>
      <p>How are you feeling today?</p>
      <form action="" className="form" onSubmit={handleSearch}>
        <label htmlFor="trackValue">I am:</label>
        <input
          id="trackValue"
          value={trackValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Type your emotion"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Form;
