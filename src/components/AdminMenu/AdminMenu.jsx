import "./AdminMenu.css";

export const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <a
        href="/valhalla"
        className={location.pathname === "/valhalla" ? "menu-selected" : ""}
      >
        Manage users
      </a>
      <a
        href="/admingames"
        className={location.pathname === "/admingames" ? "menu-selected" : ""}
      >
        Game director
      </a>
      <a
        href="/adminshop"
        className={location.pathname === "/adminshop" ? "menu-selected" : ""}
      >
        Global shop
      </a>
      <a href="/games">🔁</a>
    </div>
  );
};
