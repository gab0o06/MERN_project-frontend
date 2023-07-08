import { LoginData } from "../../../interfaces/index";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().trim().required("* Your username is required!"),
    password: yup
      .string()
      .min(4, "* Must be at least 4 characters")
      .max(12, "* Must be at least 12 characters")
      .required("* Your password is required!"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post(
        "https://mern-project-mf1v.onrender.com/auth/login",
        data
      );
      if (response.data.error) return alert("Ese usuario no existe");
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="auth__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth__title">Login</h2>
        <div className="form__group">
          <label htmlFor="username">Username :</label>
          <input type="text" id="username" {...register("username")} />
          <p>{errors.username?.message}</p>
        </div>
        <div className="form__group">
          <label htmlFor="password">Password :</label>
          <input type="password" id="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit" className="form__button">
          Login
        </button>
      </form>
    </div>
  );
};
