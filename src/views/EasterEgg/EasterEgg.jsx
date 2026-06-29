import { useState } from "react";
import "./EasterEgg.css";

export const EasterEgg = () => {
  const [buttonLabel, setButtonLabel] = useState("Claim");

  async function setClipboard(text) {
    const type = "text/plain";
    const clipboardItemData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
  }

  const copyToClipboard = () => {
    const password = "asgard";
    setClipboard(password.split("").reverse().join(""));
    setButtonLabel("Copied!");

    window.setTimeout(() => {
      setButtonLabel("Claim");
    }, 150);
  };

  const goToGamePage = () => {
    window.location.assign("/games");
  };

  const msg =
    "if you manage to read this message you will understand that back home we always speak in reversE. if you want the password ,go claim iT";

  return (
    <div className="easter-egg-view">
      <img
        src="/salamandra.png"
        alt="Viking Games Logo"
        className="easter-egg-img"
      />
      <p className="easter-egg-text">{msg.split("").reverse().join("")}</p>

      <div
        className="easter-egg-button"
        onClick={copyToClipboard}
        type="button"
      >
        {buttonLabel}
      </div>
      <div className="easter-egg-button" onClick={goToGamePage} type="button">
        Go Home
      </div>
    </div>
  );
};
