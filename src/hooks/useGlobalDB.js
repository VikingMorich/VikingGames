import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "../firebase/config.js";

export function useGlobalDB() {
  const [vikingGamesdb, setVikingGamesdb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
    // Busca en el objeto vikingGamesdb.Users un usuario que coincida con email y password
    if (!vikingGamesdb || !vikingGamesdb.Users) {
      throw new Error("No hay datos de usuarios disponibles");
    }

    const users = vikingGamesdb.Users;
    const entries = Object.entries(users); // [ [key, userObj], ... ]

    for (const [key, u] of entries) {
      // Normalizamos a string para evitar diferencias tipo (number vs string)
      if (
        String(u.email) === String(email) &&
        String(u.password) === String(password)
      ) {
        const foundUser = { key, username: u.username, email: u.email };
        setUser(foundUser);
        console.log("Usuario encontrado:", foundUser);
        return foundUser;
      }
    }

    // Si no se encuentra coincidencia
    throw new Error("Credenciales inválidas");
  };

  const logoutAdmin = () => {
    setUser(null);
  };

  return {
    loading,
    vikingGamesdb,
    loginAdmin,
    logoutAdmin,
    user,
  };
}
