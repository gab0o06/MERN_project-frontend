import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <>
      <nav className="navbar">
        <Link className="navbar__item" to="/">
          Home
        </Link>
        <Link className="navbar__item" to="/create-recipe">
          Create Recipe
        </Link>

        {cookies.access_token ? (
          <>
            <Link className="navbar__item" to="/save-recipes">
              Save Recipes
            </Link>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <Link className="navbar__item" to="/auth">
            Auth
          </Link>
        )}
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};
