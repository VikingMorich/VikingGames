import "./Games.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";

export const Games = () => {
  const { vikingGamesdb } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";

  return (
    <>
      <BasicMenu />
      <div className="section-view">
        {historyStages[currentStage]?.type === "text" ? (
          <div className="games-text-wrapper">
            {" "}
            <h1 className="games-text-title">
              {historyStages[currentStage].title}
            </h1>{" "}
            <p className="games-text-description">
              {" "}
              {historyStages[currentStage].description}{" "}
            </p>{" "}
          </div>
        ) : (
          <div className="loader-container">
            <img src="/icons/loader.png" alt="Loading..." className="loader" />
          </div>
        )}
      </div>
    </>
  );
};
