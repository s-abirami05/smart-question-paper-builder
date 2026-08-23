// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ9d1D_dYba4Cu-SYuWWPWfDsSlrU9mlg",
  authDomain: "mern-stack-project-3ff3f.firebaseapp.com",
  projectId: "mern-stack-project-3ff3f",
  storageBucket: "mern-stack-project-3ff3f.firebasestorage.app",
  messagingSenderId: "550068997638",
  appId: "1:550068997638:web:42a71466c0decefcb4fd87",
  measurementId: "G-55E4730TV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Setup Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// 🔥 கட்டாயமாக Google Account-ஐ Select பண்ணும் திரையைக் கொண்டுவர இந்த வரி உதவும்
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export { signInWithPopup };