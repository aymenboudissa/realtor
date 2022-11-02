// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuH6TEF_juse-Y-DcGrP_Y43IAOb7jFns",
  authDomain: "realtor-cadfa.firebaseapp.com",
  projectId: "realtor-cadfa",
  storageBucket: "realtor-cadfa.appspot.com",
  messagingSenderId: "88524351015",
  appId: "1:88524351015:web:56898a2f068227eec79002",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
