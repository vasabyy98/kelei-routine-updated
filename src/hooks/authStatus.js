import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const useAuthListener = () => {
  // assume user to be logged out
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // auth listener to keep track of user signing in and out
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // console.log(user);
      }
    });
  }, []);

  return { currentUser };
};
