import { FirebaseApp, getApp, getApps, initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDBeVWD7oT13g8vOtCRfBBPx6g2aeFXkc",
  authDomain: "refil-v1.firebaseapp.com",
  databaseURL:
    "https://refil-v1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "refil-v1",
  storageBucket: "refil-v1.appspot.com",
  messagingSenderId: "128121858942",
  appId: "1:128121858942:web:d802aa5863797b784de12f",
  measurementId: "G-4W4BVDS5HD",
};

let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
