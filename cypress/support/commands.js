// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from "cypress-firebase";


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

firebase.initializeApp(firebaseConfig);
attachCustomCommands({Cypress, cy, firebase});
