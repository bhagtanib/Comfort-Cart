import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA_JSnJQiN3gJqT5TqBpU2C6DGZfFw9jrQ",
  authDomain: "clone-eb298.firebaseapp.com",
  projectId: "clone-eb298",
  storageBucket: "clone-eb298.appspot.com",
  messagingSenderId: "281500865754",
  appId: "1:281500865754:web:217813b365959bab5481e3",
  measurementId: "G-Y8GZ4GZYGM",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp)

