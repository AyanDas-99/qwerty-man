// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDf1tooZF92mXx2L-47QJvEQmgxRbrSX1Q",
    authDomain: "qwerty-man.firebaseapp.com",
    projectId: "qwerty-man",
    storageBucket: "qwerty-man.appspot.com",
    messagingSenderId: "236766923534",
    appId: "1:236766923534:web:beea7c2b0f30155768255f",
    measurementId: "G-SW9X014HZH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();