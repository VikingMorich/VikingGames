import "./BasicMenu.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";

export const BasicMenu = () => {
  const { user } = useGlobalDB();

  return (
    <div className="basic-menu">
      {user ? <a href="/user">User</a> : <a href="/login">Login</a>}
      <a href="/shop">Botiga</a>
      <a href="/games">Games</a>
      <a href="/scores">Scores</a>
    </div>
  );
};
