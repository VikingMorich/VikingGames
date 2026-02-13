import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "../firebase/config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export function useGlobalDB() {
  const [vikingGamesdb, setVikingGamesdb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const db = getDatabase(app);
    const baseDbRef = ref(db, `/`);
    const unsubscribe = onValue(baseDbRef, (snapshot) => {
      setVikingGamesdb(snapshot.val());
      setLoading(false);
    });
    // Cleanup on unmount
    return () => {
      unsubscribe();
      off(baseDbRef);
    };
  }, []);

  const loginAdmin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        window.location.href = "/games";
      })
      .catch((error) => {
        console.log("mal");
        const errorCode = error.code;
        const errorMessage = error.message;
        throw error;
      });
  };

  onAuthStateChanged(auth, (u) => {
    if (u) {
      if (!user) {
        setUser(u);
      }
    } else {
      console.log("Nadie ha iniciado sesión");
    }
  });

  const logoutAdmin = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        window.location.href = "/";
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return {
    loading,
    vikingGamesdb,
    loginAdmin,
    logoutAdmin,
    user,
  };
}
