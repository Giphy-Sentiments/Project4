import firebaseConfig from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from "react";

function Timeline() {
    const [timeline, setTimeline] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);

        onValue(databaseRef, (response) => {
            const newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push({ key: key, name: data[key] })
            }
            setTimeline(newState.reverse());

            // Check if there are multiple entries for today's date
            const date = new Date();
            const today = `${date.getMonth() + 1} ${date.getDate()}, ${date.getFullYear()}`;
            const entriesToday = newState.filter(entry => entry.name.date === today);
            if (entriesToday.length > 1) {
                setErrorMsg('You can only search for one gif per day');
            } else {
                setErrorMsg(null);
            }
        });
    }, []);

    return (
      <section>
        <h3> Your timeline:</h3>
        <div className="timelineContainer wrapper">
          {errorMsg && <p>{errorMsg}</p>}
          {timeline.map((result) => {
            return (
              <div>
                  <h4>{result.name.date}</h4>
                  <img
                    src={result.name.image}
                    alt={`user selected gif to show the mood of ${result.name.mood}`}
                    style={{ width: "300px", height: "300px"}}
                  />
                  <h4>{result.name.mood}</h4>
              </div>
            );
          })}
        </div>
      </section>
    );
}

export default Timeline;

