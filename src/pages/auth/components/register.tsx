import { RegisterData } from "../../../interfaces/index";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

export const Register = () => {
  const schema = yup.object().shape({
    username: yup.string().required("* Your username is required!"),
    password: yup
      .string()
      .min(4, "* Must be at least 4 characters")
      .max(12, "* Must be at least 12 characters")
      .required("* Your password is required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "* Password don't match")
      .required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterData) => {
    const { confirmPassword, ...userData } = data;

    try {
      await axios.post(`http://localhost:3001/auth/register`, userData);
      alert("Register successfully, now you can login!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth__title">Register</h2>
        <div className="form__group">
          <label htmlFor="username-register">Username :</label>
          <input type="text" id="username-register" {...register("username")} />
          <p>{errors.username?.message}</p>
        </div>
        <div className="form__group">
          <label htmlFor="password-register">Password :</label>
          <input
            type="password"
            id="password-register"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div className="form__group">
          <label htmlFor="confirmPassword">Confirm Password :</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          <p>{errors.confirmPassword?.message}</p>
        </div>
        <button type="submit" className="form__button">
          Register
        </button>
      </form>
    </div>
  );
};
