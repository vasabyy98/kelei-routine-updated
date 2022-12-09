import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  deleteDoc,
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

// test get data - exercises or exercise sets
const getData = async (url) => {
  const q = query(collection(db, url));

  const data = await getDocs(q);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

//create exercise
const createNew = async (url, data) => {
  const ref = collection(db, url);

  await addDoc(ref, (data = { data }));

  return data;
};

// delete exercise and all of its references in exercise sets collection
const deleteExerciseData = async (exerciseId) => {
  const docRef = doc(db, `users/${auth.currentUser.uid}/exercises`, exerciseId);

  await deleteDoc(docRef).then(() => console.log("deleted"));

  // get exerciseSets collections' docs containing exercise id
  const excRef = query(collection(db, `users/${auth.currentUser.uid}/exercisesSets`));
  const queryRef = query(excRef, where("data.selectedExercises", "array-contains", exerciseId));

  // update doc
  (async () => {
    const req = await getDocs(queryRef);

    req.docs.forEach((doc) => {
      let data = doc.data().data;

      data.selectedExercises = data.selectedExercises.filter((exercise) => exercise !== exerciseId);

      updateDoc(doc.ref, { data });
    });
  })();

  return exerciseId;
};

const editExercise = async (exerciseId, updatedData) => {
  const docRef = doc(db, `users/${auth.currentUser.uid}/exercises`, exerciseId);

  const data = updatedData;

  updateDoc(docRef, { data });
};

const deleteExerciseSet = async (exerciseSetId) => {
  const docRef = doc(db, `users/${auth.currentUser.uid}/exercisesSets`, exerciseSetId);

  deleteDoc(docRef);

  return exerciseSetId;
};

const editExerciseSet = async (exerciseSetId, updatedData) => {
  console.log(exerciseSetId, updatedData);
  const docRef = doc(db, `users/${auth.currentUser.uid}/exercisesSets`, exerciseSetId);

  const data = updatedData;

  updateDoc(docRef, { data });
};

export {
  auth,
  db,
  getData,
  deleteExerciseData,
  editExercise,
  deleteExerciseSet,
  editExerciseSet,
  createNew,
};
