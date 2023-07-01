import firebaseConfig from "./firebase";
import { getDatabase, ref, push } from "firebase/database";
import app from './firebase.js';
import '../App.css';

// 1. Get data from datebase and display on the page
// 2. Allow users to save books in our database
// 3. Allow users to remove books they have saved
function StoreGifs({ searchTerm, finalSelection }) {
    const date = new Date();
    const month = date.toLocaleString("en-US", {
        month: "long",
    });
    const day = date.getDate();
    const year = date.getFullYear();

    const result = {
        mood: searchTerm,
        image: finalSelection,
        date: `${month} ${day}, ${year}`,
    };

    const sendToTimeline = () => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);
        push(databaseRef, result);
    };

    return (
        <div >

            <img
                src={`${finalSelection}`}
                alt={`user's selected gif that represents the mood of ${searchTerm}`}
            />

            <button onClick={sendToTimeline} >
                Save to Timeline
            </button>
        </div >
    );
};


export default StoreGifs;
