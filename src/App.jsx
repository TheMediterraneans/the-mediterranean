import { Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import EditRecipesLoggedUsers from "./pages/EditRecipesLoggedUsers";
import CreateAccount from "./pages/CreateAccount";
import Playlist from "./components/Playlist";
import { useEffect, useState } from "react";
import { ref, get, push, set, serverTimestamp } from "firebase/database";
import { database } from "./firebase/firebaseConfig";

import PageNotFound from "./pages/PageNotFound";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipesList = async () => {
      try {
        const recipeRef = ref(database, "recipes");
        const snapshot = await get(recipeRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const recipeArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setRecipes(recipeArray);
        } else {
          console.log("No recipes found");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    getRecipesList();
  }, []);

  const createNewRecipe = (newRecipe) => {
  const db = getDatabase();
  const recipeRef = ref(db, 'recipes');

  const newRecipeWithMeta = {
    ...newRecipe,
    createdAt: serverTimestamp()
  };

  const newRef = push(recipeRef);
  set(newRef, newRecipeWithMeta)
    .then(() => {
      setRecipes(prev => [{ id: newRef.key, ...newRecipeWithMeta }, ...prev]);
    })
    .catch((error) => {
      console.error("Something went wrong while creating the recipe:", error);
    });
};


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="recipe-list" element={<RecipeList recipes={recipes} loading={loading} />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/create" element={<AddRecipe onCreate={createNewRecipe} />} />
      </Routes>

      
    </>
  );
}

export default App;
