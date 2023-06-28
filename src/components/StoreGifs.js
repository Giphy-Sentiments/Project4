import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import firebase from './firebase.js';
import './App.css';

// 1. Get data from datebase and display on the page
// 2. Allow users to save books in our database
// 3. Allow users to remove books they have saved
function StoreGifs({ searchTerm }) {
    const [storeGifs, setStoreGifs] = useState([]);

    useEffect(() => {
        // open the connection through our configured firebase app
        const database = getDatabase(firebase);
        // point ot where we want the date from in our database
        const dbRef = ref(database);
        // GET IT (the data)
        // onValue versus .get
        onValue(dbRef, (response) => {
            // parse the data out of response
            const data = response.val();
            console.log(data);
            // declare empty array to put stuff inside
            const newData = [];// moved it outside of the for in so that you can access outside of it
            // loop over the object
            for (let gifKey in data) {
                // {book1: "Beloved", book2: "The Hitchhiker's Guide to the Galaxy", book3: "A Little Life"}
                // [{key: '-sldkhgwpoer', name: 'Black Beauty'}, {}, {}, {}]
                const gifData = {
                    key: gifKey,
                    name: searchTerm,
                    gifUrl: url,
                    // how are we looking to store the date and if we are passing it as a prop
                    date: dateProp
                }
                newData.push(gifData);
            }
            // console.log(response.val());
            setStoreGifs(newData)// re-render
        })
    }, [])

    const [isToggled, setIsToggled] = useState(false);

    const handleClick = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div>
        //button function
            <button onClick={handleClick}>
            //image that includes the icon with the toggle function
                <img className={isToggled ? 'isToggledCSSclass' : 'notToggledCSSclass'} src='icon' />
            </button>
        </div>
    );
};

// figure out how to track if button is toggled and store it in a useState
// onclick function will look at useState to see if it is toggled and will store data into firebase if toggled
const handleSubmit = (event) => {
    // prevent the default action (submit)
    event.preventDefault();
    // save stuff into the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, userInput);
    // update the state after submit to an empty string
    setUserInput('');
}

const handleRemoveBook = (bookId) => {
    console.log('remove a book');
    // reach out to firebase and remove a book
    // event.target => element, read that element
    const database = getDatabase(firebase);
    // tell the database which node (book) to delete:
    const dbRef = ref(database, `/${bookId}`)
    remove(dbRef);
}
return (
    <div className="App">

    </div>
);


export default StoreGifs;
