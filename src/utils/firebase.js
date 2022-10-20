import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyBEa72OHwdDr0dQy05SXuXsxdDfq8juwFE",
  // authDomain: "imageapp-assignment-6.firebaseapp.com",
  // projectId: "imageapp-assignment-6",
  // storageBucket: "imageapp-assignment-6.appspot.com",
  // messagingSenderId: "767625906013",
  // appId: "1:767625906013:web:058fc87e781071b3fd0ab4",
  // measurementId: "G-K4N725PQGT",


  apiKey: "AIzaSyA1aPqjHTrPxoFlVxF-lLiAI3cy2i3SR5k",
  authDomain: "maher-vue.firebaseapp.com",
  databaseURL: "https://maher-vue-default-rtdb.firebaseio.com",
  projectId: "maher-vue",
  storageBucket: "maher-vue.appspot.com",
  messagingSenderId: "694861415607",
  appId: "1:694861415607:web:269a6d6a8d2d4b755c7932"


};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
