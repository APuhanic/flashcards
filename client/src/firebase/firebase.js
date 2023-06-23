// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtRzBa-HmrCJuUdaqF-3eVePbi0vS-Wnk",
  authDomain: "flashcards-bb7c4.firebaseapp.com",
  projectId: "flashcards-bb7c4",
  storageBucket: "flashcards-bb7c4.appspot.com",
  messagingSenderId: "110458463030",
  appId: "1:110458463030:web:6d194310aa03d9a3e00997",
  measurementId: "G-HD77TP8R73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app