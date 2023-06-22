//configuration file of firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2NLJ1hPba2EYd6zfeBzYTVoSqWCuMBEU",
  authDomain: "chat-4897b.firebaseapp.com",
  projectId: "chat-4897b",
  storageBucket: "chat-4897b.appspot.com",
  messagingSenderId: "951858781154",
  appId: "1:951858781154:web:3f7f7bb7ec92c7f35177bb"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();