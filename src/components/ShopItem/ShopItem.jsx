import "./ShopItem.css";
//import { useGlobalDB } from "../hooks/useGlobalDB";

export const ShopItem = ({ item }) => {
  const { img, name, stock = 0, price = 0 } = item;
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

          <span className="shop-item__price">{price} 🪙</span>
        </div>

        <div className="shop-item__actions">
          <button
            className="shop-item__buy"
            onClick={() => {}}
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
