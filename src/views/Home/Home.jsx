import "./Home.css";

export const Home = () => {
  const goToMainPage = () => {
    window.location.assign("/login");
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
        <div className="home-button" onClick={goToMainPage}>
          Login
        </div>
      </div>
    </div>
  );
};
