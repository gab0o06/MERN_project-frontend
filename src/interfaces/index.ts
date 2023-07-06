export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface CreateRecipeData {
  name: string;
  description: string;
  ingredients: (string | undefined)[];
  instructions: string;
  imageURL: string;
  cookingTime: number;
}

export interface SavedRecipes {
  _id: string;
  name: string;
  description: string;
  ingredients: (string | undefined)[];
  instructions: string;
  imageURL: string;
  cookingTime: number;
  savedRecipes?: boolean;
}
