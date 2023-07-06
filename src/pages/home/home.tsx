import { useState, useEffect } from "react";
import axios from "axios";

import { SavedRecipes } from "../../interfaces/index";
import { RecipeComponent } from "../../components/recipe";
import { useGetUserID } from "../../hooks/useGetUserID";
import "./styles.css";

export const Home = () => {
  const [recipes, setRecipes] = useState<SavedRecipes[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<[string]>([""]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/recipes");

        setRecipes(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );

        setSavedRecipes(data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  return (
    <div>
      <h1 className="home__title">Recipes</h1>
      <ul className="home__list">
        {recipes.map((recipe) => {
          return (
            <RecipeComponent
              key={recipe._id}
              _id={recipe._id}
              name={recipe.name}
              description={recipe.description}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              imageURL={recipe.imageURL}
              cookingTime={recipe.cookingTime}
              savedRecipes={savedRecipes?.includes(recipe._id)}
            />
          );
        })}
      </ul>
    </div>
  );
};
