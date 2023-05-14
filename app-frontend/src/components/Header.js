import React, { useState } from "react";
import { Search } from "react-feather";
import { categories } from "../data/categories";

const MenuButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={`hamburger ${open ? "open" : ""}`} onClick={handleClick}>
      <div className="line-top" />
      <div className="line-middle" />
      <div className="line-bottom" />
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <div className="top-bar">
        <div className="navigation">
          <div className="search">
            <input
              type="text"
              className="search-term"
              placeholder="Search"
            ></input>
            <button type="submit" className="search-button">
              <Search size={18} />
            </button>
          </div>
        </div>
        <div className="logo">
          <h1>.innews</h1>
        </div>
        <div className="buttons">
          <button>Sign In</button>
          <MenuButton />
        </div>
      </div>
      <div className="bottom-bar">
        <div className="menu-wrapper">
          <nav>
            {categories.map((cat, index) => (
              <a key={index}>{cat.title}</a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
