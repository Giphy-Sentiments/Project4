import React from 'react';

function Form({ gifEmotion, setGifEmotion, handleSearch }) {

  const handleInputChange = (event) => {
    setGifEmotion(event.target.value);
  };

  return (
    <div>
      <p>How are you feeling today?</p>
      <form action="" className="form" onSubmit={handleSearch}>
        <label htmlFor="gifEmotion">How do you feel today?</label>
        <input
          id="gifEmotion"
          value={gifEmotion}
          onChange={handleInputChange}
          type="text"
          placeholder="Type your emotion"
        />
        <button type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Form;
