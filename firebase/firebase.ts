import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDg60YgpM25ySjOjSovffDgrbephhs4Mdc",
  authDomain: "coorder-login.firebaseapp.com",
  projectId: "coorder-login",
  storageBucket: "coorder-login.appspot.com",
  messagingSenderId: "701228866647",
  appId: "1:701228866647:web:e0f4810236be685792d712",
  measurementId: "G-MDK02GYGSP",
};
let Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
