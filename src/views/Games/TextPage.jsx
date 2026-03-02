import "./Games.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";

export const TextPage = () => {
  const { vikingGamesdb } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";

  return (
    <>
      <div className="games-text-wrapper">
        <h1 className="games-text-title">
          {historyStages[currentStage]?.title}
        </h1>
        <p className="games-text-description">
          {historyStages[currentStage]?.description}
        </p>
        {historyStages[currentStage]?.reward && (
          <>
            <div className="divider" />
            <p className="games-text-reward">
              <u>Recompensa:</u> {historyStages[currentStage].reward}
            </p>
          </>
        )}
      </div>
    </>
  );
};
