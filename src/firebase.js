import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCGyz_nuRllZReXytgCkZQ5DwD_XmmAEDw",
  authDomain: "chat-35f7f.firebaseapp.com",
  projectId: "chat-35f7f",
  storageBucket: "chat-35f7f.appspot.com",
  messagingSenderId: "780855575840",
  appId: "1:780855575840:web:59c6cfee85e394b3334345"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
