import "./Shop.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { ShopItem } from "../../components/ShopItem/ShopItem";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { ToastContainer } from "react-toastify";

export const Shop = () => {
  const { vikingGamesdb } = useGlobalDB();
  const isHappyHour = vikingGamesdb?.Games?.happyHour;

  return (
    <>
      <BasicMenu />
      <div className="section-view">
        {isHappyHour && (
          <div className="happy-hour-sticky">
            🍺 Happy Hour - Descomptes aplicats🍺
          </div>
        )}
        <h1 className="section-title">Catàleg botiga</h1>
        <div className="shop-items-container">
          {vikingGamesdb
            ? Object.entries(vikingGamesdb.Shop).map(([id, item]) => (
                <ShopItem key={id} item={item} itemId={id} />
              ))
            : null}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
