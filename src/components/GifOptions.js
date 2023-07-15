import React, { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import StoreGifs from "./StoreGifs";

function GifOptions({ searchTerm }) {
  // initial state for the gifs - contains data we get form the API
  const [gifs, setGifs] = useState([]);

  // state for initial amount of gifs to display to the user
  const [visible, setVisible] = useState(3);

  const [selectedGif, setSelectedGif] = useState("");

  const [finalSelection, setFinalSelection] = useState("");

  //state will keep track of the loading variable
  const [loading, setLoading] = useState(false);

  // state for error handling
  const [error, setError] = useState(null);

  const select = (e) => {
    setSelectedGif(e.target.value);
  };

  const sendToResults = (e) => {
    e.preventDefault();
    setFinalSelection(selectedGif);
    setSelectedGif("");
  };

  // API loading state styling
  const cssOverride = {
    display: "block",
    margin: "0 auto",
  };

  //function to update the visible state to give users more gifs
  const showMoreGifs = (e) => {
    e.preventDefault();
    if (visible < gifs.length) {
      setVisible((prevValue) => prevValue + 3);
    }
  };

  useEffect(() => {
    setVisible(3);
    if (searchTerm) {
      // set loading true until API loads
      setLoading(true);

      // reset error state before API call
      setError(null);

      axios({
        url: "https://api.giphy.com/v1/gifs/search",
        method: "GET",
        params: {
          api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
          q: searchTerm,
          limit: 9,
        },
      })
        .then((res) => {
          setGifs(res.data.data);
        })
        .catch((error) => {
          setError(
            "We're having trouble getting the GIFs, please try again later!"
          );
        })
        .finally(() => {
          //once API loads set loading to false
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  }, [searchTerm]);

  return (
    <>
      {loading ? (
        <FadeLoader
          color="#ff7600"
          loading={loading}
          cssOverride={cssOverride}
          size={550}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              {gifs.length > 0 && (
                <form>
                  <fieldset>
                    <label
                      className="gifList"
                      htmlFor="gifList"
                      aria-label="gifs"
                    >
                      {gifs.slice(0, visible).map((gif, index) => (
                        <input
                          className="radio"
                          type="radio"
                          name="gif"
                          value={gif.images.original.url}
                          style={{
                            backgroundImage: `url(${gif.images.original.url})`,
                            backgroundSize: "300px 300px",
                          }}
                          key={index}
                          onChange={select}
                          checked={selectedGif === gif.images.original.url}
                          disabled={finalSelection ? true : false}
                        />
                      ))}
                    </label>
                    {visible === gifs.length && (
                      <div className="error">
                        Please select from the above GIFs or search again
                      </div>
                    )}
                    <button
                      className="button"
                      onClick={sendToResults}
                      disabled={finalSelection ? true : false}
                    >
                      Select GIF
                    </button>
                    {visible < gifs.length && (
                      <button onClick={showMoreGifs} className="button">
                        {" "}
                        More GIFs
                      </button>
                    )}
                  </fieldset>
                </form>
              )}
              {finalSelection && (
                <div>
                  <StoreGifs
                    finalSelection={finalSelection}
                    searchTerm={searchTerm}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default GifOptions;
