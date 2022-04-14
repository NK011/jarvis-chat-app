import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSpr7G6OFpzxKT2HVvlHoKIwxT1fGSK60",
    authDomain: "chat-app-ac828.firebaseapp.com",
    projectId: "chat-app-ac828",
    storageBucket: "chat-app-ac828.appspot.com",
    messagingSenderId: "64487456791",
    appId: "1:64487456791:web:d49ebc1239115aaf43dc52",
    measurementId: "G-3HKT7RB30J"
  };

  

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebase.firestore()

  export {auth, db}