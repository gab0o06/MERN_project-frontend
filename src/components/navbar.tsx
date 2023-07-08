import { Link, Outlet, useNavigate } from "react-router-dom";
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

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    console.log(menuRef.current);

    document.addEventListener("click", handleClickOutside);
    return () => {
      console.log(menuRef.current);
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
            <Link className="link__item" onClick={toggleMenu} to="/">
              Home
            </Link>
            <Link
              className="link__item"
              onClick={toggleMenu}
              to="/create-recipe"
            >
              Create Recipe
            </Link>

            {cookies.access_token ? (
              <>
                <Link
                  className="link__item"
                  onClick={toggleMenu}
                  to="/save-recipes"
                >
                  Save Recipes
                </Link>
                <button onClick={logout}>Log Out</button>
              </>
            ) : (
              <Link className="link__item" onClick={toggleMenu} to="/auth">
                Auth
              </Link>
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
