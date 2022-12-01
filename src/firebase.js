
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS9d3ahFaIT-mlckGZQWWu9QzAqZvrlqw",
  authDomain: "chat-47f56.firebaseapp.com",
  projectId: "chat-47f56",
  storageBucket: "chat-47f56.appspot.com",
  messagingSenderId: "82662997330",
  appId: "1:82662997330:web:92fa435e84dfca87c54e8b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();