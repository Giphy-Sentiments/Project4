import { useState, useEffect } from "react";
import axios from "axios";
import ".././App.css";

function Form() {
// store the emotion the user submitted in the form in usestate
  const[gifEmotion, setGifEmotion] = useState([]);


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
