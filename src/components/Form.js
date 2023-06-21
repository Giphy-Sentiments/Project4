import { useState } from "react";

function Form({ setEmotion }) {
  const [gifEmotion, setGifEmotion] = useState("");

  const handleInputChange = (event) => {
    setGifEmotion(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmotion(gifEmotion);
    setGifEmotion('');
  }

  return (
    <div>
      <form action="" className="form">
        <label htmlFor="gifEmotion">How do you feel today?</label>
        <input
          id="gifEmotion"
          value={gifEmotion}
          onChange={handleInputChange}
          type="text"
          placeholder="Type your emotion"
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </div>
  );
}

export default Form;
