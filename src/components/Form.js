import React from 'react';

function Form({ trackValue, setTrackValue, handleSearch }) {

// handleInputChange is an event handler function for the input field's onChange event.
// Each time the user types into the input field, the onChange event is triggered,
// and handleInputChange is called.

// The function receives the event object as a parameter, which contains information
// about the current event (in this case, the typing/change in the input field).

const handleInputChange = (event) => {
  // Within the function, we call setTrackValue, which is a state setter function for 
  // the trackValue state. This function updates the trackValue state with the new value.
  
  // event.target refers to the element that triggered the event, which is the input field.
  // event.target.value is the current value of the input field.

  setTrackValue(event.target.value); // We pass this value to setTrackValue, updating our state.

  // this function allows our app to "track" what the user is typing in the input field in real-time. By updating the trackValue state each time the user types, our app always has the current value of the input field stored in state, ready to be used when needed (e.g., when the form is submitted and a new search needs to be performed).
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
        <button type="submit" className="button">Search</button>
      </form>
    </div>
  );
}

export default Form;
