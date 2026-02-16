import { useEffect, useState } from "react";
import "./Countdown.css";

export const Countdown = () => {
  const targetDate = new Date("2026-09-12T11:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <h1>VikingGames</h1>
      <img
        src="/logoVikingGames.png"
        alt="Viking Games Logo"
        className="logo-viking-games"
      />
      <div className="countdown-timer">
        <div className="time-box">
          <span className="time-value">{timeLeft.days}</span>
          <span className="time-label">Dies</span>
        </div>
        <div className="time-box">
          <span className="time-value">{timeLeft.hours}</span>
          <span className="time-label">Hores</span>
        </div>
        <div className="time-box">
          <span className="time-value">{timeLeft.minutes}</span>
          <span className="time-label">Minuts</span>
        </div>
        <div className="time-box">
          <span className="time-value">{timeLeft.seconds}</span>
          <span className="time-label">Segons</span>
        </div>
      </div>
    </div>
  );
};
