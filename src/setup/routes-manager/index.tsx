import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "../../pages/home/home";
import { Auth } from "../../pages/auth/auth";
import { CreateRecipe } from "../../pages/create-recipe/create-recipe";
import { SaveRecipe } from "../../pages/saved-recipes/saved-recipes";
import { ErrorPage } from "../../pages/404Page/404Page";

import { Navbar } from "../../components/navbar";

export const createRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/" element={<Home />} />
      <Route path="auth" element={<Auth />} />
      <Route path="create-recipe" element={<CreateRecipe />} />
      <Route path="save-recipes" element={<SaveRecipe />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
