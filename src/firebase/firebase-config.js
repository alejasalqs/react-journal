import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW9U4pKEXc22kzk96DVg03upodvCd8eBw",
  authDomain: "react-journal-app-b58e0.firebaseapp.com",
  projectId: "react-journal-app-b58e0",
  storageBucket: "react-journal-app-b58e0.appspot.com",
  messagingSenderId: "274360265688",
  appId: "1:274360265688:web:e66467b8a970e4978fa0ad",
  measurementId: "G-TKDHCKTEL2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

// referencia a la base de dato
const db = firebase.firestore();
// Provider para autenticar google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
