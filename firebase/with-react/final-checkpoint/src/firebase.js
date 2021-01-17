import firebase from 'firebase';

const config = { // this is the same thing as `firebaseConfig`
    // THIS SHOULD BE YOUR CONFIG! NOT WHAT'S IN THIS FILE
    apiKey: "AIzaSyDI63SyY4DQTUvURl7vG7cl3lgpJ4LYbcc",
    authDomain: "qwerhacks-react-firestore.firebaseapp.com",
    projectId: "qwerhacks-react-firestore",
    storageBucket: "qwerhacks-react-firestore.appspot.com",
    messagingSenderId: "605077934185",
    appId: "1:605077934185:web:7b6556b4d4ee533adf12f8"
};

firebase.initializeApp(config);

export default firebase;
