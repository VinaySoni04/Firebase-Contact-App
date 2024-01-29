// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3GFUtP3HpN2IaicF1DRmUETvVkHI_-xU",
  authDomain: "contact-app-90765.firebaseapp.com",
  projectId: "contact-app-90765",
  storageBucket: "contact-app-90765.appspot.com",
  messagingSenderId: "273748470556",
  appId: "1:273748470556:web:4d7ce12456b2f0d6b128d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
