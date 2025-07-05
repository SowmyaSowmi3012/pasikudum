// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMiazpfIfLi7or3K5FmeDV-Vsg6abx2Ag",
  authDomain: "pasikudu-8d9dd.firebaseapp.com",
  projectId: "pasikudu-8d9dd",
  storageBucket: "pasikudu-8d9dd.firebasestorage.app",
  messagingSenderId: "703543184810",
  appId: "1:703543184810:web:80bfc55418301aae91afd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize and export auth
const auth = getAuth(app);
export { auth };
