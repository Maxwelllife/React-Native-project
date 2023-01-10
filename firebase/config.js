// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBM1FaScA_mdU5TvD_J-uPmbueGdJKZtgU",
  authDomain: "momentssaver-bac5e.firebaseapp.com",
  projectId: "momentssaver-bac5e",
  storageBucket: "momentssaver-bac5e.appspot.com",
  messagingSenderId: "715724048547",
  appId: "1:715724048547:web:b6572c16c81d02277f5716",
  measurementId: "G-Q059E3KJX5",
};

// Initialize Firebase
// export default app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
