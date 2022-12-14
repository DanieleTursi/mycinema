
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUutFhyCCb6wutC53C2QP8pXXQ19iE8Go",
    authDomain: "mycinema-15e12.firebaseapp.com",
    projectId: "mycinema-15e12",
    storageBucket: "mycinema-15e12.appspot.com",
    messagingSenderId: "248934584964",
    appId: "1:248934584964:web:ab53546b22aeb0c12828d1",
    measurementId: "G-093BW2MJ53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// connectAuthEmulator(auth, 'http://localhost:9099');
export const db = getFirestore(app);
// const todosCol = collection(db, 'todos');
// const snapshot = await getDocs(todosCol);

// onAuthStateChanged(auth, user => {
//     if (user != null) {
//         console.log('logged in');
//     }
//     else {
//         console.log('No user')
//     }
// })

