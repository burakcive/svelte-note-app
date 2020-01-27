import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyCXqFJumO0rAQnvfcNXvXUn6U57HoB112U",
    authDomain: "scrawling-d4f9d.firebaseapp.com",
    databaseURL: "https://scrawling-d4f9d.firebaseio.com",
    projectId: "scrawling-d4f9d",
    storageBucket: "scrawling-d4f9d.appspot.com",
    messagingSenderId: "440641069725",
    appId: "1:440641069725:web:0596f330624b5476826a74",
    measurementId: "G-QE4ZG856G5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();