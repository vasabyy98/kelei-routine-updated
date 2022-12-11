import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
import { setDoc, doc } from "firebase/firestore";

const logIn = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signUp = async (name, email, password) => {
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

    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { logIn, signUp };
