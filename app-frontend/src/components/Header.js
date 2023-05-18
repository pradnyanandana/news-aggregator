import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Search } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { logoutUser } from "../requests";
import { toast } from "react-toastify";

const MenuButton = ({ open, setOpen }) => {
  const handleClick = () => {
    setOpen(open ? false : "menu");
  };

  return (
    <div
      className={`hamburger ${open === "menu" ? "open" : ""}`}
      onClick={handleClick}
    >
      <div className="line-top" />
      <div className="line-middle" />
      <div className="line-bottom" />
    </div>
  );
};

const Menu = ({ open, pathname, token, handleLogout, loading }) => {
  const menuItems = categories.map((cat, index) => {
    return (
      <>
        <div
          className="menu-item-wrapper"
          style={{ "--animation-delay": `${index * 0.2}s` }}
        >
          <Link to={`/${cat.slug}`} className="menu-item-text">
            {cat.title}
          </Link>
        </div>
      </>
    );
  });

  return (
    <div className={`drawer ${open === "menu" ? "open" : ""}`}>
      {open === "menu" && (
        <>
          <div className="menu-list">{menuItems}</div>
          {pathname === "/dashboard" ? (
            <button>
              {loading ? <ReactSVG src="svg/loading-circle.svg" /> : "Log Out"}
            </button>
          ) : (
            <Link to={token ? "/dashboard" : "/sign-in"}>
              <button
                style={{ "--animation-delay": "0.4s" }}
                onClick={handleLogout}
              >
                {token ? "Dashboard" : "Sign In"}
              </button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

const SearchDrawer = ({ open, setOpen }) => {
  const handleClick = () => {
    setOpen(open ? false : "search");
  };

  return (
    <>
      <div
        className={`search-icon ${open === "search" ? "open" : ""}`}
        onClick={handleClick}
      >
        <Search size={24} />
      </div>
      <div className={`search-drawer ${open === "search" ? "open" : ""}`}>
        {open === "search" && (
          <div>
            <input
              type="text"
              className="search-term"
              placeholder="Search"
            ></input>
          </div>
        )}
      </div>
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser } = useUser();
  const { setToken, token } = useToken();

  const { pathname } = location;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    logoutUser({ token })
      .then((response) => {
        navigate("/sign-in");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data?.message);
        setLoading(false);
      });
  };

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
          <SearchDrawer open={open} setOpen={setOpen} />
        </div>
        <div className="logo">
          <h1>.innews</h1>
        </div>
        <div className="buttons">
          {pathname === "/dashboard" ? (
            <button onClick={handleLogout}>
              {loading ? <ReactSVG src="svg/loading-circle.svg" /> : "Log Out"}
            </button>
          ) : (
            <Link to={token ? "/dashboard" : "/sign-in"}>
              <button>{token ? "Dashboard" : "Sign In"}</button>
            </Link>
          )}
          <MenuButton open={open} setOpen={setOpen} />
          <Menu
            open={open}
            setOpen={setOpen}
            pathname={pathname}
            token={token}
            loading={loading}
            handleLogout={handleLogout}
          ></Menu>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="menu-wrapper">
          <nav>
            {categories.map((cat, index) => {
              const active =
                pathname === `/${cat.slug}` ||
                (pathname === "/" && cat.slug === "news");

              return (
                <Link
                  className={active ? "active" : ""}
                  key={index}
                  to={`/${cat.slug}`}
                >
                  {cat.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
