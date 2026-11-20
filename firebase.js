import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0r2xBg-yeNghBUXTRZmECtgpM_F_ecEw",
    authDomain: "campusconnect-857b5.firebaseapp.com",
    projectId: "campusconnect-857b5",
    storageBucket: "campusconnect-857b5.firebasestorage.app",
    messagingSenderId: "136751995",
    appId: "1:136751995:web:6df493d015fd7457c8abde"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
};
