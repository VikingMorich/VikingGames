import "./BasicMenu.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";

export const BasicMenu = () => {
  const { user } = useGlobalDB();
  const location = window.location;
  console.log("Current path:", location.pathname);

  return (
    <div className="basic-menu">
      {user ? (
        <a
          href="/user"
          className={location.pathname === "/user" ? "menu-selected" : ""}
        >
          Usuari
        </a>
      ) : (
        <a href="/login">Login</a>
      )}
      <a
        href="/shop"
        className={location.pathname === "/shop" ? "menu-selected" : ""}
      >
        Botiga
      </a>
      <a
        href="/games"
        className={location.pathname === "/games" ? "menu-selected" : ""}
      >
        VikingGames
      </a>
      <a
        href="/scores"
        className={location.pathname === "/scores" ? "menu-selected" : ""}
      >
        Puntuacions
      </a>
      {user?.email === "enricmoriche91@hotmail.com" && (
        <a href="/valhalla">🔁</a>
      )}
    </div>
  );
};
