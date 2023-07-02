import React, { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";

function GifOptions({ searchTerm, searchCount }) {
  // gifs stores an array of arrays, each array representing a set of GIFs fetched from the Giphy API
  const [gifs, setGifs] = useState([[]]);

  // offset is used for pagination in the Giphy API requests. It specifies the starting position in the results set.
  // Pagination is a technique that breaks content into several pages, to avoid loading too much data at once. It's used in APIs to control the amount of data returned per request.
  const [offset, setOffset] = useState(0);

  // alert is a boolean state which controls the display of a warning when more than three sets of GIFs are requested.
  const [alert, setAlert] = useState(false);

  const [loading, setLoading] = useState(false); 

  // fetchGifs function performs the API request to Giphy API with the given search term, limit of results and offset.
  // The function sets the loading state to true when a request starts and to false when a request ends.
  const fetchGifs = () => {
    // setLoading is set to true to indicate the start of an API call.
    setLoading(true);

    axios({
      url: "https://api.giphy.com/v1/gifs/search",
      method: "GET",
      params: {
        // The Giphy API key is provided to authorize the request.
        api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
        // The searchTerm state is used as the search query.
        q: searchTerm,
        // The limit param controls how many GIFs will be fetched in one request.
        limit: 3,
        // The offset is used for pagination. It tells the API how many GIFs to skip before starting to return results.
        offset: offset,
      },
    }).then((res) => {
      // Once the response is received, the new GIFs are added to the gifs state.
      setGifs((oldGifs) => {
        const newGifs = [...oldGifs];
        // The last element of the newGifs array is replaced with the newly fetched data.
        newGifs[newGifs.length - 1] = res.data.data;
        // Loading state is set to false to hide the loading spinner now that the API request has finished.
        setLoading(false);
        // The updated gifs array is returned to update the state.
        return newGifs;
      });
      // The offset is updated to be the previous offset plus 3 (the number of GIFs fetched in one request).
      // This is done so that the next time the fetchGifs function is called, it fetches the next set of GIFs.
      setOffset((prevOffset) => prevOffset + 3);
    });
  };


  // useEffect hook is used to perform side effects. In this case, it's triggered when searchTerm or searchCount changes.
  // It resets the GIFs array, offset and alert state, and starts a new search by calling fetchGifs.
  useEffect(() => {
    // If a new search term is set, the following actions are performed:
    if (searchTerm) {

      // The `setGifs([[]])` function is called to reset the `gifs` state. It's set to an array containing an empty array, ready to store new GIFs fetched from the API.
      setGifs([[]]);

      // The `setOffset(0)` function is called to reset the `offset` state back to 0. This is important for pagination in the API requests, as it ensures that we start from the beginning of the results for the new search term.
      setOffset(0);

      // The `setAlert(false)` function is called to reset the `alert` state back to false. This ensures that any alert message from a previous search is cleared out.
      setAlert(false);

      // The `fetchGifs()` function is called to initiate a new API request based on the new search term.
      fetchGifs();
    }
  }, [searchTerm, searchCount]);

  // handleMoreGifs function adds a new set of GIFs to the display when the "More gifs" button is clicked.
  // It checks if less than three sets of GIFs have been requested before fetching more. If more than three, it sets the alert state to true.
  // handleMoreGifs is triggered when the "More gifs" button is clicked.
  const handleMoreGifs = () => {

    // It first checks whether the current number of GIF sets (each set contains up to 3 GIFs) is less than 3.
    if (gifs.length < 3) {

      // If the condition is met (i.e., we have less than 3 sets of GIFs), it adds a new empty array to the GIFs state.
      // This is done in preparation for the new set of GIFs that will be fetched.
      setGifs((oldGifs) => [...oldGifs, []]); 
      // The ... operator is the spread operator. The spread operator is used to split up array elements OR object properties. The ...oldGifs means that it takes each item in the oldGifs array and spreads them out. It's essentially creating a new array that includes all the items from the oldGifs array plus a new empty array ([]).
      // So if our oldGifs array was [1, 2, 3], then [...oldGifs, []] would result in [1, 2, 3, []].
      // This is used here to create a new state that has all the old gifs and adds an empty array for the new gifs that will be fetched from the fetchGifs() function.

      // Then, it calls fetchGifs function to fetch a new set of GIFs from the API.
      fetchGifs();
    } else {
      // If the condition is not met (i.e., we have 3 or more sets of GIFs), it sets the 'alert' state to true.
      // This is to indicate that the maximum number of GIF sets has been reached and no more GIFs can be fetched.
      setAlert(true);
    }
  };


 return (
    <>
    {loading? (
      <FadeLoader
        color="#192422"
        loading={loading}
        cssOverride={override}
        size={550}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> 
    ) :(
    <ul className="gifOptions">
      {gifs.map((gifRow, index) => (
        <li className="gifList" key={index}>
          {gifRow.map((gif) => (
            <div  key={gif.id}>
              <img
                src={gif.images.original.url}
                alt={gif.title}
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          ))}
        </li>
      ))}
      {alert && <div>Please search again</div>}
      <button onClick={handleMoreGifs}>More gifs</button>
    </ul>
    )}
    </>
  );
}
// The <div> element inside the map function is used to wrap each individual <img> element generated by the mapping of the gifRow array. This allows us to apply specific styles or perform additional operations on each individual <img> element, if needed.

export default GifOptions;
