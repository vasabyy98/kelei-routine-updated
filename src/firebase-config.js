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
  deleteDoc,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getData = (url, stateFunc) => {
  const q = query(collection(db, url));

  (async () => {
    const data = await getDocs(q);

    stateFunc(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  })();
};

const deleteExercise = async (exerciseId) => {
  const docRef = doc(db, `users/${auth.currentUser.uid}/exercises`, exerciseId);

  deleteDoc(docRef);

  // get exerciseSets collections' docs containing exercise id
  const excRef = query(collection(db, `users/${auth.currentUser.uid}/exercisesSets`));
  const queryRef = query(excRef, where("data.selectedExercises", "array-contains", exerciseId));

  // update doc
  (async () => {
    const req = await getDocs(queryRef);

    req.docs.forEach((doc) => {
      let data = doc.data().data;

      data.selectedExercises = data.selectedExercises.filter((exercise) => exercise !== exerciseId);

      updateDoc(doc.ref, { data }).catch((error) => {
        console.log(error);
      });
    });
  })();
};

export { auth, db, getData, deleteExercise };

// const deleteItem = async (item) => {
//   const d = query(collection(db, "allTasks"), where("id", "==", item.id));
//   const docSnap = await getDocs(d);

//   docSnap.forEach((doc) => {
//     deleteDoc(doc.ref); // and not doc.data()
//   });
// };
