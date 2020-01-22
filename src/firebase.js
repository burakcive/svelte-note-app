import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyDvJUjvlLLTvJxZzlHqwX57YhAhRtfOYYQ",
    authDomain: "cats-test-eb078.firebaseapp.com",
    databaseURL: "https://cats-test-eb078.firebaseio.com",
    projectId: "cats-test-eb078",
    storageBucket: "cats-test-eb078.appspot.com",
    messagingSenderId: "643030912311",
    appId: "1:643030912311:web:872dcf9408caf53e829eb2"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();