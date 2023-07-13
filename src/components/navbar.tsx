import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    setCookies("access_token", "");
    localStorage.removeItem("userID");
    navigate("/auth");
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const mql = matchMedia("(max-width: 480px)");

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div
          className={
            isMenuVisible ? "navbar__container-mobile" : "navbar__container"
          }
          ref={menuRef}
        >
          <div className="">
            <img
              id="menu__icon"
              className={isMenuVisible ? " menu navbar__icon" : "menu"}
              src={
                isMenuVisible
                  ? "assets/images/close.svg"
                  : "assets/images/menu.svg"
              }
              alt="menu"
              onClick={toggleMenu}
            />
          </div>
          <div
            className={
              isMenuVisible ? "link__container-mobile" : "link__container"
            }
          >
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "link__item-active link__item" : "link__item";
              }}
              onClick={mql.matches ? toggleMenu : () => {}}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "link__item-active link__item" : "link__item";
              }}
              onClick={mql.matches ? toggleMenu : () => {}}
              to="/create-recipe"
            >
              Create Recipe
            </NavLink>

            {cookies.access_token ? (
              <>
                <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? "link__item-active link__item"
                      : "link__item";
                  }}
                  onClick={mql.matches ? toggleMenu : () => {}}
                  to="/save-recipes"
                >
                  Save Recipes
                </NavLink>
                <button onClick={logout}>Log Out</button>
              </>
            ) : (
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "link__item-active link__item"
                    : "link__item";
                }}
                onClick={mql.matches ? toggleMenu : () => {}}
                to="/auth"
              >
                Auth
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};
