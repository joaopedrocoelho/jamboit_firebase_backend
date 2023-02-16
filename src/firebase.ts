import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDBEIrX2xPirCThRFe8JOcyOx_PYz2IE1c",
    authDomain: "jamboit-56810.firebaseapp.com",
    projectId: "jamboit-56810",
    storageBucket: "jamboit-56810.appspot.com",
    messagingSenderId: "723205719858",
    appId: "1:723205719858:web:fd054181cdaef92924392b",
    measurementId: "G-QYBJ182Y59",
    databaseURL: "https://jamboit-56810-default-rtdb.firebaseio.com/"
  };
  
  // Initialize Firebase
  export const firebaseApp = initializeApp(firebaseConfig);
  export const database = getDatabase(firebaseApp);