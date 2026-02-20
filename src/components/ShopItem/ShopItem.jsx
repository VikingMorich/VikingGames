import "./ShopItem.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { userShopPurchase } from "../../functions/gameFunctions";
import { toast } from "react-toastify";

export const ShopItem = ({ item, itemId }) => {
  const { img, name, stock = 0, price = 0, happyHour = null } = item;
  const { vikingGamesdb, user } = useGlobalDB();

  // busca la entrada [id, userObj] cuyo email coincide
  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const isHappyHour = vikingGamesdb?.Games?.happyHour;
  const dbUserId = dbEntry?.[0]; // "001"
  const dbUser = dbEntry?.[1];

  const handlePurchase = async () => {
    if (stock <= 0) {
      toast.error("Artículo agotado", {
        autoClose: 1500,
        theme: "colored",
      });
    } else if (
      dbUser?.coins < price ||
      (isHappyHour && happyHour && dbUser?.coins < happyHour)
    ) {
      toast.error("No tienes suficientes MoricheCoins", {
        autoClose: 1500,
        theme: "colored",
      });
    } else {
      try {
        const currentPrice = isHappyHour && happyHour ? happyHour : price;
        await userShopPurchase(dbUserId, itemId, currentPrice);
        toast.success("Compra realitzada correctament", {
          autoClose: 1500,
          theme: "colored",
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <article className={`shop-item ${stock <= 0 ? "shop-item--soldout" : ""}`}>
      <div className="shop-item__media">
        <img src={`/shop/${img}`} alt={name} className="shop-item__image" />
      </div>

      <div className="shop-item__body">
        <h3 className="shop-item__title">{name}</h3>

        <div className="shop-item__meta">
          <span className="shop-item__stock">
            {stock > 0 ? `${stock} stock` : "Agotado"}
          </span>
          {isHappyHour && happyHour ? (
            <div className="shop-item__price--happy">
              <span className="shop-item__price--happy-old">{price} 🪙</span>
              <span className="shop-item__price--happy-new">
                {happyHour} 🪙
              </span>
            </div>
          ) : (
            <span className="shop-item__price">{price} 🪙</span>
          )}
        </div>

        <div className="shop-item__actions">
          <button
            className={`shop-item__buy ${dbUser?.coins < price || (isHappyHour && happyHour && dbUser?.coins < happyHour) ? "shop-item__buy--disabled" : ""}`}
            onClick={() => handlePurchase()}
            disabled={stock <= 0}
            aria-disabled={stock <= 0}
          >
            {stock > 0 ? "Comprar" : "No disponible"}
          </button>
        </div>
      </div>
    </article>
  );
};
