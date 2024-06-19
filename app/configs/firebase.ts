// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh3OWtGtNgJjPM0yAbaoLPrTRbgb6LLCQ",
  authDomain: "fir-websockets-chat.firebaseapp.com",
  projectId: "fir-websockets-chat",
  storageBucket: "fir-websockets-chat.appspot.com",
  messagingSenderId: "182207462801",
  appId: "1:182207462801:web:bbda75e8afb64485026e30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
