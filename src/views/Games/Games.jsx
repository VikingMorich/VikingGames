import "./Games.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";
import { TextPage } from "./TextPage";
import { ExamPage } from "./ExamPage";

export const Games = () => {
  const { vikingGamesdb } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";

  const renderPage = () => {
    switch (historyStages[currentStage]?.type) {
      case "text":
        return <TextPage />;
      case "exam":
        return <ExamPage />;
      // case "memory":
      //   return <MemoryPage />;
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
