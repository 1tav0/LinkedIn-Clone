import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBzBxLm5wjsTjzUE4T0CjU38_x4Ler-8vk",
    authDomain: "clone-inlinked.firebaseapp.com",
    projectId: "clone-inlinked",
    storageBucket: "clone-inlinked.appspot.com",
    messagingSenderId: "207585554784",
    appId: "1:207585554784:web:fb454241d1ecda770e2e05"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }