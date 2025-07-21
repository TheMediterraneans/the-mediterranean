import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAF7FS4wjDIiv0dDpUU2mF4JJS0ue5MDxE",
  authDomain: "the-mediterraneans.firebaseapp.com",
  databaseURL: "https://the-mediterraneans-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "the-mediterraneans",
  storageBucket: "the-mediterraneans.firebasestorage.app",
  messagingSenderId: "29302074855",
  appId: "1:29302074855:web:6d657656f2c82354abe142"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);



export { app, auth, database };
