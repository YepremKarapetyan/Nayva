import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMgGd87VHNznX4rQEIr0zh1sEDZz5-DKA",
  authDomain: "nayva-reviews.firebaseapp.com",
  projectId: "nayva-reviews",
  storageBucket: "nayva-reviews.firebasestorage.app",
  messagingSenderId: "460637953155",
  appId: "1:460637953155:web:24493b54969edfc56d8fb6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
