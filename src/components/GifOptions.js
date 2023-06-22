import React, { useEffect, useState } from "react";
import axios from "axios";

function GifOptions({ searchTerm }) {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axios({
        url: "https://api.giphy.com/v1/gifs/search",
        method: "GET",
        params: {
          api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
          q: searchTerm,
          limit: 3,
        },
      }).then((res) => {
        setGifs(res.data.data);
      });
    }
  }, [searchTerm]);

  return (
    <div className="gifOptions">
      {gifs.map((gif) => (
        <img src={gif.images.fixed_height.url} alt={gif.title} key={gif.id} />
      ))}
    </div>
  );
}

export default GifOptions;

              