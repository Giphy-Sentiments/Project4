import { useEffect, useState } from "react";
import axios from "axios";

function GifOptions({ emotion }) {
  const [gif, setGif] = useState([]);

  useEffect(() => {
    axios({
      url: "https://api.giphy.com/v1/gifs/search",
      method: "GET",
      params: {
        api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
        q: emotion,
        limit: 3,
      },
    }).then((res) => {
      const gifData = res.data.data;
      setGif(gifData);
      console.log(res.data.data);
    });
  }, [emotion]);

  return (
    <div>
      <p> select a gif </p>
      <ul>
        {gif.map((selectedGif, index) =>  (
          <li key={index}>
            <img src={selectedGif.images.original.url} alt="gif" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GifOptions;


              