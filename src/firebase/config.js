// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHx59cSpmRgzn6PjxkMo82HrFx4w3CihI",
  authDomain: "twitter-84eeb.firebaseapp.com",
  projectId: "twitter-84eeb",
  storageBucket: "twitter-84eeb.appspot.com",
  messagingSenderId: "163157171399",
  appId: "1:163157171399:web:f08fdf1eeb6a2406a872e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

// veritabanının referansını alma
export const db = getFirestore(app)

// storage referansını al
export const storage = getStorage(app)