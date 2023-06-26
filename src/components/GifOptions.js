import React, { useEffect, useState } from "react";
import axios from "axios";

function GifOptions({ searchTerm, searchCount }) {
  const [gifs, setGifs] = useState([[]]);
  const [offset, setOffset] = useState(0);
  const [alert, setAlert] = useState(false);

  const fetchGifs = () => {
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
        return newGifs;
      });
      setOffset((prevOffset) => prevOffset + 3);
    });
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
    <div className="gifOptions">
      {gifs.map((gifRow, index) => (
        <ul className="gifList" key={index}>
          {gifRow.map((gif) => (
            <li key={gif.id}>
              <img
                src={gif.images.original.url}
                alt={gif.title}
                style={{ width: "200px", height: "200px" }}
              />
            </li>
          ))}
        </ul>
      ))}
      {alert && <div>You can only search for a total of 9 gifs</div>}
      <button onClick={handleMoreGifs}>More gifs</button>
    </div>
  );
}

export default GifOptions;
