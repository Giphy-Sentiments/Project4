import React, { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";

function GifOptions({ searchTerm, searchCount }) {
  const [gifs, setGifs] = useState([[]]);
  const [offset, setOffset] = useState(0);
  const [alert, setAlert] = useState(false);

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


  const handleMoreGifs = () => {
    if (gifs.length < 3) {
      setGifs((oldGifs) => [...oldGifs, []]);
      fetchGifs();
    } else {
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

export default GifOptions;
