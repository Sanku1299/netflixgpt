// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzR97ROJ0L_SxgqlvNe8SxpshP9YWyOro",
  authDomain: "netflixgpt-7ab26.firebaseapp.com",
  projectId: "netflixgpt-7ab26",
  storageBucket: "netflixgpt-7ab26.appspot.com",
  messagingSenderId: "705043653375",
  appId: "1:705043653375:web:d9d26288275fdfbb0622ca",
  measurementId: "G-PFZFT4RCKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
