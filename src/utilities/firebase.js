// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set, update, push } from 'firebase/database';
import { useState, useEffect } from "react";
import "firebase/storage"
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdjQ9ZnfXyb258VqFgbVUz4SzEiWBiPAQ",
    authDomain: "helpmeheal-49a3f.firebaseapp.com",
    databaseURL: "https://helpmeheal-49a3f-default-rtdb.firebaseio.com",
    projectId: "helpmeheal-49a3f",
    storageBucket: "helpmeheal-49a3f.appspot.com",
    messagingSenderId: "659893085250",
    appId: "1:659893085250:web:df1b73d52c11f8fef7f9db"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const storage = getStorage(app);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);

//
export const updateData = (childRef, value) => (
    update(childRef, value)
);

export const getRefByPush = (path) => (
    push(ref(database, path)).key
);

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(app), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(app));

export { firebaseSignOut as signOut };

export const useUserState = () => {
    // const [user, setUser] = useState();
    const [user, setUser] = useData('/user/0');
    // useEffect(() => {
    //     onIdTokenChanged(getAuth(app), setUser);
    // }, []);

    return [user];
};