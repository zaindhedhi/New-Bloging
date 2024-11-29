// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyYb2J-oz69mPRuTpAKWtMx4jqSjgYaKQ",
  authDomain: "new-bloging.firebaseapp.com",
  projectId: "new-bloging",
  storageBucket: "new-bloging.firebasestorage.app",
  messagingSenderId: "1065711814819",
  appId: "1:1065711814819:web:6e145aaf684db76533d716"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
