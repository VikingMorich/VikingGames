import "./Shop.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { ShopItem } from "../../components/ShopItem/ShopItem";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

export const Shop = () => {
  const { vikingGamesdb } = useGlobalDB();
  const [isHappyHour, setIsHappyHour] = useState(
    vikingGamesdb?.Games?.happyHour,
  );
  const [activateShop, setActivateShop] = useState(
    vikingGamesdb?.Games?.activateShop || false,
  );
  const [currentStage, setCurrentStage] = useState("loading");

  useEffect(() => {
    if (vikingGamesdb?.Games?.currentPage) {
      setCurrentStage(vikingGamesdb.Games.currentPage);
    }
  }, [vikingGamesdb]);

  useEffect(() => {
    setIsHappyHour(vikingGamesdb?.Games?.happyHour);
  }, [vikingGamesdb?.Games?.happyHour]);

  useEffect(() => {
    setActivateShop(vikingGamesdb?.Games?.activateShop || false);
  }, [vikingGamesdb?.Games?.activateShop]);

  return (
    <>
      <BasicMenu />
      {currentStage === "loading" ? (
        <div className="loader-container">
          <img src="/icons/loader.png" alt="Loading..." className="loader" />
        </div>
      ) : (
        <div className="section-view">
          {isHappyHour && (
            <div className="happy-hour-sticky">
              🍺 Happy Hour - Descomptes aplicats🍺
            </div>
          )}
          <h1 className="section-title">Catàleg botiga</h1>
          {activateShop ? (
            <div className="shop-items-container">
              {vikingGamesdb
                ? Object.entries(vikingGamesdb.Shop).map(([id, item]) => (
                    <ShopItem key={id} item={item} itemId={id} />
                  ))
                : null}
            </div>
          ) : (
            <div className="shop-message-inactive">
              La botiga està inactiva... <br />
              <br />
              Espera a que comencin els VikingGames
            </div>
          )}
          <ToastContainer />
        </div>
      )}
    </>
  );
};
