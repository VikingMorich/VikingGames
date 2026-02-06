import "./Home.css";

export const Home = () => {
  const goToLoginPage = () => {
    window.location.assign("/login");
  };

  const goToGamePage = () => {
    window.location.assign("/games");
  };

  return (
    <div className="home-view">
      <div className="home-wrap">
        <div className="home-op">
          <span>Welcome to the Viking Games</span>
        </div>
        <img
          src="/logoVikingGames.png"
          alt="Viking Games Logo"
          className="logo-viking-games"
        />
        <div className="home-button" onClick={goToLoginPage}>
          Login
        </div>
        <div className="home-button" onClick={goToGamePage}>
          Espectador
        </div>
      </div>
    </div>
  );
};
