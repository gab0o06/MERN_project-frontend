import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { useGetUserID } from "../../hooks/useGetUserID";
import { CreateRecipeData } from "../../interfaces";

export const CreateRecipe = () => {
  const schema = yup.object().shape({
    name: yup.string().trim().required(),
    description: yup.string().required(),
    ingredients: yup.array().of(yup.string().min(1)).required(),
    instructions: yup.string().required(),
    imageURL: yup
      .string()
      .trim()
      .url()
      .matches(/(?:(?:jpe?g|png|gif|webp))/gi)
      .required(),
    cookingTime: yup.number().required(),
  });

  const userID = useGetUserID();
  const navigate = useNavigate();
  const [cookie, _] = useCookies(["access_token"]);

  const { handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  });

  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const onSubmit = async (data: CreateRecipeData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        {
          ...data,
          userID,
        },
        {
          headers: {
            authorization: cookie.access_token,
          },
        }
      );

      if (response.data.error) return alert("Imagen Invalida");

      alert("Recipe successfully added!");
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (
          axiosError.response?.status === 401 ||
          axiosError.response?.status === 403
        )
          return navigate("/auth");
      }
    }
  };

  return (
    <div className="recipe__container">
      <form className="create__recipe" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="recipe__title">Create Recipe</h2>
        <div className="form__item">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" {...register("name")} />
        </div>
        <div className="form__item">
          <label htmlFor="description">Description:</label>
          <textarea id="description" {...register("description")}></textarea>
        </div>
        <div className="form__item">
          <label htmlFor="ingredients">Ingredients:</label>
          {ingredients.map((ingredient, key) => {
            return (
              <input
                type="text"
                id={`${ingredient}${key}`}
                key={key}
                {...register(`ingredients.${key}`)}
                onChange={(e) => {
                  ingredient = e.target.value;
                }}
              />
            );
          })}
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <div className="form__item">
          <label htmlFor="instructions">Instructions:</label>
          <textarea {...register("instructions")} id="instructions"></textarea>
        </div>
        <div className="form__item">
          <label htmlFor="imageURL">Image URL:</label>
          <input type="text" id="imageURL" {...register("imageURL")} />
        </div>
        <div className="form__item">
          <label htmlFor="cookingTime">Cooking Time (min):</label>
          <input type="number" id="cookingTime" {...register("cookingTime")} />
        </div>
        <button className="form__button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};
