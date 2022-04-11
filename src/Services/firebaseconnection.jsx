import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
    apiKey: "AIzaSyDCC5oRJQolcDN3jsNbMdH6AMCm1zM8fBw",
    authDomain: "anitips-64ef2.firebaseapp.com",
    projectId: "anitips-64ef2",
    storageBucket: "anitips-64ef2.appspot.com",
    messagingSenderId: "978423693316",
    appId: "1:978423693316:web:c4a80ff6a6e5cda9f23551",
    measurementId: "G-XCVJHEC5QR"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default firebase;


