import { useEffect, useState } from "react";
import axios from "axios";

import { useGetUserID } from "../../hooks/useGetUserID";
import { RecipeComponent } from "../../components/recipe";
import { SavedRecipes } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export const SaveRecipe = () => {
  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipes[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userID) return navigate("/auth");
    const fetchSavedRecipes = async () => {
      try {
        const { data } = await axios.get(
          `https://mern-project-mf1v.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSavedRecipes();
  }, []);

  return (
    <div>
      <h1 className="home__title">Saved Recipes</h1>
      <ul className="home__list">
        {savedRecipes.map((recipe) => {
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
              savedRecipes={true}
            />
          );
        })}
      </ul>
    </div>
  );
};
