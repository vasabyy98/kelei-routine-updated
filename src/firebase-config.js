import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC72A-TZWUdDk6ilE1xl_cG7BOkjt-4Opo",
  authDomain: "kelei-routine.firebaseapp.com",
  projectId: "kelei-routine",
  storageBucket: "kelei-routine.appspot.com",
  messagingSenderId: "944336982087",
  appId: "1:944336982087:web:13b2ebb6d0b03a6c05a162",
  measurementId: "G-EQET77N0Q1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    updateProfile(user, {
      displayName: name,
    });
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
