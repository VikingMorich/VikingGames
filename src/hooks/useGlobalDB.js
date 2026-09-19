import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "../firebase/config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Shared module-level state so multiple components share a single DB listener
let sharedData = null;
let sharedVersion = 0;
let listeners = [];
let initialized = false;
let unsubscribeShared = null;

function notifyAll() {
  listeners.forEach((l) => {
    try {
      l.setVikingGamesdb(sharedData);
      l.setDbVersion(sharedVersion);
    } catch (e) {
      // ignore individual listener errors
    }
  });
}

export function useGlobalDB() {
  const [vikingGamesdb, setVikingGamesdb] = useState(sharedData);
  const [loading, setLoading] = useState(!initialized);
  const [dbVersion, setDbVersion] = useState(sharedVersion);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Register local setters as a listener
    const listener = { setVikingGamesdb, setDbVersion };
    listeners.push(listener);

    // If shared subscription not initialized, create it
    if (!initialized) {
      initialized = true;
      const db = getDatabase(app);
      const baseDbRef = ref(db, `/`);
      unsubscribeShared = onValue(baseDbRef, (snapshot) => {
        const nextData = snapshot.val();
        sharedData = nextData ? JSON.parse(JSON.stringify(nextData)) : null;
        sharedVersion = sharedVersion + 1;
        // updated sharedData and sharedVersion
        // notify all registered listeners
        notifyAll();
        setLoading(false);
      });
    } else {
      // push current values to this new listener
      setVikingGamesdb(sharedData);
      setDbVersion(sharedVersion);
      setLoading(false);
    }

    return () => {
      // remove listener
      listeners = listeners.filter((l) => l !== listener);
      // if no listeners left, unsubscribe shared listener
      if (listeners.length === 0 && unsubscribeShared) {
        try {
          unsubscribeShared();
        } catch (e) {
          console.warn("useGlobalDB shared unsubscribe error:", e);
        }
        try {
          const db = getDatabase(app);
          off(ref(db, `/`));
        } catch (e) {
          console.warn("useGlobalDB shared off error:", e);
        }
        unsubscribeShared = null;
        initialized = false;
        // cleaned up shared subscription
      }
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
        window.location.href = "/user";
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
    vikingGamesdbVersion: dbVersion,
    loginAdmin,
    logoutAdmin,
    user,
  };
}
