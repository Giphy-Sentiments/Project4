import firebaseConfig from "./firebase";
import { getDatabase, ref, push, orderByChild, equalTo, get, query } from "firebase/database";
import "../App.css";
import { Link } from "react-router-dom";

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

    const today = `${month} ${day}, ${year}`;
    const gifsOnDateRef = query(databaseRef, orderByChild("date"), equalTo(today));

    get(gifsOnDateRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("Gif has been populated for that day");
        } else {
          push(databaseRef, result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <img
        src={`${finalSelection}`}
        alt={`user's selected gif that represents the mood of ${searchTerm}`}
      />

      <Link className="button" onClick={sendToTimeline} to="/timeline">
        Save to Timeline
      </Link>

    </div>
  );
}

export default StoreGifs;

