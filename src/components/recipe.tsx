import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { SavedRecipes } from "../interfaces/index";
import { useGetUserID } from "../hooks/useGetUserID";

export const RecipeComponent = (props: SavedRecipes) => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [cookie, _] = useCookies(["access_token"]);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const SaveRecipe = async (recipeID: string | undefined) => {
    if (!userID) return navigate("/auth");

    try {
      await axios.put(
        "https://mern-project-mf1v.onrender.com/recipes/",
        {
          recipeID,
          userID,
        },
        {
          headers: {
            authorization: cookie.access_token,
          },
        }
      );
      setIsSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="list__item" key={props._id}>
      <div className="list__header">
        <h2 className="list__title">{props.name}</h2>
        {props.savedRecipes ? (
          <button className="button__recipe" disabled={true}>
            Saved
          </button>
        ) : (
          <button
            onClick={() => {
              SaveRecipe(props._id);
            }}
            disabled={isSaved}
            className="button__recipe"
          >
            {isSaved ? "Saved" : "Save Recipe"}
          </button>
        )}
      </div>
      <div>
        <h3 className="list__description">{props.description}</h3>
      </div>
      <div>
        <p>Ingredients:</p>
        <div className="ingredients__container">
          {props.ingredients.map((ingredient, key) => {
            return <p key={key}>- {ingredient}</p>;
          })}
        </div>
      </div>
      <img
        loading="lazy"
        className="list__image"
        src={props.imageURL}
        alt={props.name}
      />
      <div className="list__footer">
        <p>
          Intructions: <span className="list__white">{props.instructions}</span>
        </p>
        <p>
          Cooking Time:{" "}
          <span className="list__white">{props.cookingTime} (minutes)</span>
        </p>
      </div>
    </li>
  );
};
