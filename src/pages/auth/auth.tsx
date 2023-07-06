import { Login } from "./components/login";
import { Register } from "./components/register";
import "./styles.css";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};
