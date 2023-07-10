import firebaseConfig from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from "react";
import Footer from './Footer';

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
        <>
          <div>
              {errorMsg && <p>{errorMsg}</p>}
              {timeline.map((result) => {
                  return (
                      <div className="timelineContainer">
                          <h3>{result.name.date}</h3>
                          <h4>{result.name.mood}</h4>
                          <img
                              src={result.name.image}
                              alt={`user selected gif to show the mood of ${result.name.mood}`}
                          />
                      </div>
                  );
              })}
          </div>
          {/* <Footer /> */}
        </>
    );
}

export default Timeline;

