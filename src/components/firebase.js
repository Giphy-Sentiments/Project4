// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzfw9q9C205LnAtaS_-Xv7SIzS10403hk",
    authDomain: "giphy-sentiment-a53d0.firebaseapp.com",
    projectId: "giphy-sentiment-a53d0",
    storageBucket: "giphy-sentiment-a53d0.appspot.com",
    messagingSenderId: "822334179218",
    appId: "1:822334179218:web:4cbfbed69700667315a34b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;