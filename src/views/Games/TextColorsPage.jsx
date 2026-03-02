import "./Games.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";

export const TextColorsPage = () => {
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
        <div className="color-scheme">
          <div className="color-scheme__item">
            <div className="color-scheme__color color-scheme__color--epicwin" />
            <span className="color-scheme__label">Pujes 2 nivells</span>
            <span className="color-scheme__label">-</span>
            <span className="color-scheme__label-icon">🎯</span>
          </div>
          <div className="color-scheme__item">
            <div className="color-scheme__color color-scheme__color--win" />
            <span className="color-scheme__label">Pujes 1 nivell</span>
            <span className="color-scheme__label">-</span>
            <span className="color-scheme__label-icon">✅</span>
          </div>
          <div className="color-scheme__item">
            <div className="color-scheme__color color-scheme__color--fail" />
            <span className="color-scheme__label">Baixes 1 nivell</span>
            <span className="color-scheme__label">-</span>
            <span className="color-scheme__label-icon">❌</span>
          </div>
          <div className="color-scheme__item">
            <div className="color-scheme__color color-scheme__color--epicfail" />
            <span className="color-scheme__label">Baixes 2 nivells</span>
            <span className="color-scheme__label">-</span>
            <span className="color-scheme__label-icon">☠️</span>
          </div>
        </div>
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
