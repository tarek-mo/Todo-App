import React from "react";
import moonIcon from "../images/icon-moon.svg";
import sunIcon from "../images/icon-sun.svg";
const Header = () => {
  const toggleDarkMode = (): void => {
    document.body.classList.toggle("dark");
  };
  return (
    <header>
      <h1 className="logo">TODO</h1>
      <button onClick={toggleDarkMode} className="moon-icon">
        <img src={moonIcon} alt="Moon" />
      </button>
      <button onClick={toggleDarkMode} className="sun-icon">
        <img src={sunIcon} alt="Sun" />
      </button>
    </header>
  );
};

export default Header;
