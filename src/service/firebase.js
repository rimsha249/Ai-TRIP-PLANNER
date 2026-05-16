import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWV2-RMybaWM_2BE4r30VXKvrEaVBZDno",
  authDomain: "ai-trip-planner-d0d8a.firebaseapp.com",
  projectId: "ai-trip-planner-d0d8a",
  storageBucket: "ai-trip-planner-d0d8a.firebasestorage.app",
  messagingSenderId: "358375271204",
  appId: "1:358375271204:web:9f5143f102c75a0525e1b1",
  measurementId: "G-M61H7E9GH4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);