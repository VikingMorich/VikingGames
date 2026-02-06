import "./Valhalla.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";

export const Valhalla = () => {
  const { user, vikingGamesdb } = useGlobalDB();
  console.log("Valhalla - user:", user);

  return (
    <>
      {user?.email === "enricmoriche91@hotmail.com" ? (
        <>
          <div className="section-view">
            <h1 className="section-title">Administrador</h1>
          </div>
        </>
      ) : (
        <>Usuari no autoritzat.</>
      )}
    </>
  );
};
