// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function GifOptions({ searchTerm }) {
//   const [gifs, setGifs] = useState([]);

//   useEffect(() => {
//     if (searchTerm) {
//       axios({
//         url: "https://api.giphy.com/v1/gifs/search",
//         method: "GET",
//         params: {
//           api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
//           q: searchTerm,
//           limit: 3,
//           // random_id:""
//         },
//       }).then((res) => {
//         console.log(res.data.data)
//         setGifs(res.data.data);
//       });
//     }
//   }, [searchTerm]);

//   return (
//     <ul className="gifOptions">
//       <li className="gifList">
//       {gifs.map((gif) => (
//         <img src={gif.images.original.url} 
//         alt={gif.title} 
//         key={gif.id} 
//         style={{width:'200px', height: '200px'}}/>
//       ))}
//       </li>
//       <button>More gifs</button>
//     </ul>
//   );
// }

// export default GifOptions;


              

import React, { useEffect, useState } from "react";
import axios from "axios";

function GifOptions({ searchTerm, searchCount }) {
  const [gifs, setGifs] = useState([]);

  const fetchRandomGif = () => {
    axios({
      url: "https://api.giphy.com/v1/gifs/random",
      method: "GET",
      params: {
        api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
        tag: searchTerm,
      },
    }).then((res) => {
      setGifs((oldGifs) => [...oldGifs, res.data.data]);
    });
  };

  useEffect(() => {
    if (searchTerm) {
      setGifs([]);
      for (let i = 0; i < 3; i++) {
        fetchRandomGif();
      }
    }
  }, [searchTerm, searchCount]);

  const handleMoreGifs = () => {
    setGifs([]);
    for (let i = 0; i < 3; i++) {
      fetchRandomGif();
    }
  };

  return (
    <ul className="gifOptions">
      <li className="gifList">
        {gifs.map((gif) => (
          <img
            src={gif.images.original.url}
            alt={gif.title}
            key={gif.id}
            style={{ width: "200px", height: "200px" }}
          />
        ))}
      </li>
      <button onClick={handleMoreGifs}>More gifs</button>
    </ul>
  );
}

export default GifOptions;
