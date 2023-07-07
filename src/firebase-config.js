import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDIbgGihqjzqZv4bWmKC0_WLwDiZ-HAFKk",
    authDomain: "skolprojekt-dd173.firebaseapp.com",
    projectId: "skolprojekt-dd173",
    storageBucket: "skolprojekt-dd173.appspot.com",
    messagingSenderId: "651605026787",
    appId: "1:651605026787:web:308c96d3d223cd8bc322d6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { db, auth, provider }



