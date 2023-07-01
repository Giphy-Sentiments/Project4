import React, { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import StoreGifs from "./StoreGifs";

function GifOptions({ searchTerm, searchCount }) {
  const [gifs, setGifs] = useState([[]]);
  const [offset, setOffset] = useState(0);
  const [alert, setAlert] = useState(false);
  const [selectedGif, setSelectedGif] = useState("");
  const [finalSelection, setFinalSelection] = useState("");

  // API loading state 
  // state will keep track of loading variable 

  const [loading, setLoading] = useState(false); 

  const override = {
    display:"block",
    margin:"0, auto", 
    borderColor:"red",
    alignItems:"center",
  };
  
  const fetchGifs = () => {
    // set loading true until API loads
    setLoading(true);

    axios({
      url: "https://api.giphy.com/v1/gifs/search",
      method: "GET",
      params: {
        api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
        q: searchTerm,
        limit: 3,
        offset: offset,
      },
    }).then((res) => {
      setGifs((oldGifs) => {
        const newGifs = [...oldGifs];
        newGifs[newGifs.length - 1] = res.data.data;

        // once API loads set loading to false 
        setTimeout(() => {
          setLoading(false)
        }, 1000)

        return newGifs;
        });
      setOffset((prevOffset) => prevOffset + 3);
    })
  };

  useEffect(() => {
    if (searchTerm) {
      setGifs([[]]);
      setOffset(0);
      setAlert(false);
      fetchGifs();
    }
  }, [searchTerm, searchCount]);

  const select = (e) => {
    setSelectedGif(e.target.value);
  };

  const sendToResults = (e) => {
    e.preventDefault();
    setFinalSelection(selectedGif);
    setSelectedGif("");
  };
  
  const handleMoreGifs = () => {
    if (gifs.length < 3) {
      setGifs((oldGifs) => [...oldGifs, []]);
      fetchGifs();
    } else {
      setAlert(true);
    }
  };

  console.log(gifs)
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
        <section>
          <form>
            <fieldset>
              <label className="gifList" htmlFor="gifOptions" aria-label="gifs">
                {gifs[0].map((gif, index) => {
                  console.log(gif)
                  return (
                    <input
                      className="radio"
                      type="radio"
                      name="gif"
                      value={gif.images.original.url}
                      style={{ "backgroundImage": `url(${gif.images.original.url})`, "backgroundSize": '300px 300px' }}
                      key={index}
                      onChange={select}
                      checked={selectedGif === gif.images.original.url}
                      disabled={finalSelection ? true : false}
                    />
                  )
                  // console.log(gif?.images?.original?.url);
                })}
              </label>
              {alert && <div>Please search again</div>}
              <button className="button" onClick={sendToResults} disabled={finalSelection ? true : false}>select this gif</button>
            
              <button onClick={handleMoreGifs}>More gifs</button>

            </fieldset>
          </form>
          <div>
              <StoreGifs finalSelection={finalSelection} searchTerm={searchTerm} />
          </div>
        </section>
        
        
      
      

    )}

    </>

  );
}

{/* <ul className="gifOptions">
  {gifs.map((gifRow, index) => (
    <li className="gifList" key={index}>
      {gifRow.map((gif) => (
        <div key={gif.id}>
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
</ul> */}


export default GifOptions;
