import { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

function Form() {

    const [gif, setGif] = useState([]);


    useEffect(() => {

        axios({
            url: 'https://api.giphy.com/v1/gifs/search',
            method: 'GET',
            params: {
                api_key: '1BbHy9UljgG0JLrabA8WdBhCXn8qZNuz',
                q: 'funny cat',
                limit: 1
            }

        }).then((res) => {

            const gifData = res.data.data;
            setGif(gifData);
            console.log(res.data.data);

        })

    }
        , []);





    return (

        <div>
            <img src={gif[0].images.original.url} alt="gif" />
        </div>
    )
}

export default Form;