import firebaseConfig from './firebase';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useEffect, useState } from "react";

function Timeline() {
    const [timeline, setTimeline] = useState([]);

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
        })
    }, []);

    return (
        <div>
            {timeline.map((result) => {
                return (
                    <div>
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

    );
}

export default Timeline;