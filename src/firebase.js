// import firebase from 'firebase'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBffB-vM-Iuv-Tr3p32rG3nlzZoBa9X_2U",
    authDomain: "firechat-ccac7.firebaseapp.com",
    projectId: "firechat-ccac7",
    storageBucket: "firechat-ccac7.appspot.com",
    messagingSenderId: "766146718491",
    appId: "1:766146718491:web:4d4a13acf57881c75781be",
    measurementId: "G-DY76YGK3K4"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth }