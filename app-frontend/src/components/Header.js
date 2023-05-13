import React from "react";
import { Search } from "react-feather";

const Header = () => {
  return (
    <div className="header">
      <div className="top-bar">
        <div className="navigation">
          <div className="search">
            <input type="text" className="search-term" placeholder="Search"></input>
            <button type="submit" className="search-button">
              <Search size={15} />
            </button>
          </div>
        </div>
        <div className="logo">
          <h1>.innews</h1>
        </div>
        <div className="buttons">
          <button>Sign In</button>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="menu-wrapper">
          <nav>
            <a className="active">News</a>
            <a>Sport</a>
            <a>Entertainment</a>
            <a>Life</a>
            <a>Money</a>
            <a>Tech</a>
            <a>Travel</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
