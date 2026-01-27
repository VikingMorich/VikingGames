// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx9GNgcmRndIfCM8yWdC0bdrq_n-IJBwg",
  authDomain: "vikinggames-d49f2.firebaseapp.com",
  databaseURL:
    "https://vikinggames-d49f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vikinggames-d49f2",
  storageBucket: "vikinggames-d49f2.firebasestorage.app",
  messagingSenderId: "925514537014",
  appId: "1:925514537014:web:550be769e0b4681c662097",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
