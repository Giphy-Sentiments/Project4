import React, { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import StoreGifs from "./StoreGifs";

function GifOptions({ searchTerm }) {
  // initial state for the gifs - contains data we get form the API
  const [gifs, setGifs] = useState([]);

  // state for initial amount of gifs to display to the user
  const [visible, setVisible] = useState(3);

  // select
  const [selectedGif, setSelectedGif] = useState("");

  // final selection
  const [finalSelection, setFinalSelection] = useState("");

  const [showAlert, setShowAlert] = useState(false);

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
    borderColor: "red",
  };

  //function to update the visible state so when user requests more gifs onClick it will add 3 more gifs each time the array is mapped over

  const showMoreGifs = (e) => {
    e.preventDefault();
    if (visible >= gifs.length) {
      setShowAlert(true);
    } else {
      setVisible((prevValue) => prevValue + 3);
    }
  };

  //state will keep track of the loading variable
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      // set loading true until API loads
      setLoading(true);

      axios({
        url: "https://api.giphy.com/v1/gifs/search",
        method: "GET",
        params: {
          api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
          q: searchTerm,
          limit: 9,
        },
      }).then((res) => {
        
        setGifs(res.data.data);

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
          color="#192422"
          loading={loading}
          cssOverride={cssOverride}
          size={550}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
      
        <>
        { gifs.length > 0 && (
          <form>
            <fieldset>
              <label className="gifList" htmlFor="gifOptions" aria-label="gifs">
              
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

              {visible === gifs.length && <div>Please Select From the Options Above</div>}          
              <button
                className="button"
                onClick={sendToResults}
                disabled={finalSelection ? true : false}
              >
                Select Gif
              </button>
              {visible < gifs.length && (
                <button onClick={showMoreGifs} className="button"> More gifs</button>
              )}
            </fieldset>
          </form>
        )}
        { finalSelection &&
          <div>
            <StoreGifs
              finalSelection={finalSelection}
              searchTerm={searchTerm}
            />
          </div>
        }
        </>
        
      )}
    </>
    
  );
}

export default GifOptions;
