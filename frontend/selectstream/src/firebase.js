// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRso1ZdmdUYmMa3X--OtXi1u9unhADKsk",
  authDomain: "selectstream-ai.firebaseapp.com",
  projectId: "selectstream-ai",
  storageBucket: "selectstream-ai.appspot.com",
  messagingSenderId: "97922486081",
  appId: "1:97922486081:web:6211dd40a02ebc4e17dbc0",
  measurementId: "G-Q98ZYS1B13",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
