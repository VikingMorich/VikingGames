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
      const nextData = snapshot.val();
      setVikingGamesdb(nextData ? JSON.parse(JSON.stringify(nextData)) : null);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      off(baseDbRef);
    };
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
        console.log("Nadie ha iniciado sesión");
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

  const loginAdmin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        window.location.href = "/games";
      })
      .catch((error) => {
        console.log("mal");
        throw error;
      });
  };

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
