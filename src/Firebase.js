// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAenVWlIS8Bj59cTSra07K6JaKxbH60Llo",
  authDomain: "userlist-9c894.firebaseapp.com",
  projectId: "userlist-9c894",
  storageBucket: "userlist-9c894.appspot.com",
  messagingSenderId: "718845708456",
  appId: "1:718845708456:web:aecfebb5a863c7a3d2da9d",
  measurementId: "G-KX0FL7Q8ZG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);

// const firestore = firebase.firestore();
// Firebase storage reference
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp)
export { storage, firestore, firebaseApp };
