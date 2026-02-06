import "./Shop.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { ShopItem } from "../../components/ShopItem/ShopItem";
import { useGlobalDB } from "../../hooks/useGlobalDB";

export const Shop = () => {
  const { vikingGamesdb } = useGlobalDB();
  return (
    <>
      <BasicMenu />
      <div className="section-view">
        <h1 className="section-title">Tenda</h1>
        <div className="shop-items-container">
          {vikingGamesdb
            ? Object.entries(vikingGamesdb.Shop).map(([id, item]) => (
                <ShopItem key={id} item={item} />
              ))
            : null}
        </div>
      </div>
    </>
  );
};
