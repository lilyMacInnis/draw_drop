// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "draw-box.firebaseapp.com",
  projectId: "draw-box",
  storageBucket: "draw-box.firebasestorage.app",
  messagingSenderId: "859462302859",
  appId: "1:859462302859:web:0f4973abeb6d0c0d5ba88e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);