import "./Games.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";
import { TextPage } from "./TextPage";
import { StagePage } from "./StagePage";
import { TextColorsPage } from "./TextColorsPage";
import { ExamPage } from "./ExamPage";
import { MemoryPage } from "./MemoryPage";
import { SkillPage } from "./SkillPage";
import { VotationPage } from "./VotationPage";
import { ChoosePage } from "./ChoosePage";
import { WinnerPage } from "./WinnerPage";
import { useState, useEffect } from "react";

export const Games = () => {
  const { vikingGamesdb } = useGlobalDB();
  const [currentStage, setCurrentStage] = useState("loading");

  useEffect(() => {
    if (vikingGamesdb?.Games?.currentPage) {
      setCurrentStage(vikingGamesdb.Games.currentPage);
    }
  }, [vikingGamesdb]);

  const renderPage = () => {
    switch (historyStages[currentStage]?.type) {
      case "text":
        return <TextPage />;
      case "stage":
        return <StagePage />;
      case "text-colors":
        return <TextColorsPage />;
      case "exam":
        return <ExamPage />;
      case "memory":
        return <MemoryPage />;
      case "skill":
        return <SkillPage />;
      case "votation":
        return <VotationPage />;
      case "choose":
        return <ChoosePage />;
      case "winner":
        return <WinnerPage />;
      default:
        return (
          <div className="loader-container">
            <img src="/icons/loader.png" alt="Loading..." className="loader" />
          </div>
        );
    }
  };

  return (
    <>
      <BasicMenu />
      <div className="section-view">{renderPage()}</div>
    </>
  );
};
