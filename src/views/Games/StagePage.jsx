import "./StagePage.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";

export const StagePage = () => {
  const { vikingGamesdb } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";

  return (
    <>
      <div className="games-stage-wrapper">
        <div className="games-title-wrapper">
          <img
            src={"/scroll-paper.png"}
            alt="Stage paper"
            className="scroll-paper"
          />
          <div className="stage-text-title-wrapper">
            <h1 className="stage-text-title">FASE</h1>
            <h1
              className={
                `stage-text-title-number ` +
                (historyStages[currentStage]?.number === "REPESCA"
                  ? "special-repesca"
                  : "")
              }
            >
              {historyStages[currentStage]?.number}
            </h1>
          </div>
        </div>
        {historyStages[currentStage]?.description && (
          <p className="stage-text-description">
            {historyStages[currentStage].description}
          </p>
        )}
      </div>
    </>
  );
};
