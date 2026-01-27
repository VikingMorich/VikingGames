import "./Games.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { Login } from "../Login/Login";

export const Games = () => {
  const { user } = useGlobalDB();

  console.log("Games view - user:", user);

  return <>{!user ? <Login /> : <div className="games-view">GAMES</div>}</>;
};
