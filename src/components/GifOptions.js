function GifOptions {

// store the gif that was provided by the API
const [gif, setGif] = useState([]);

// take form input as param and us it as q in api params
// const [emotionInput, setEmotionInput]  = useParams([]);

// make API call to get gif
  useEffect(() => {
    axios({
      url: "https://api.giphy.com/v1/gifs/search",
      method: "GET",
      params: {
        api_key: "1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz",
        q: "funny cat",
        limit: 1,
      },
    }).then((res) => {
      const gifData = res.data.data;
      setGif(gifData);
      console.log(res.data.data);
    });
  }, []);

    return(

        <div>
            <p> select a gif </p>
            <ul>
                {gif.map((selectedGif) =>  (       
                  <>
                    <li>
                    <img src={selectedGif.images.original.url} alt="gif" />
                    {/* create a button with a onclick function to submit selection into firebase */}
                    </li>
                  </>     
                ))}
            </ul>


        {/* link that goes to timeline */}
        <button onClick={}>More gifs</button>
      </div>
    )

}
export default GifOptions;


              