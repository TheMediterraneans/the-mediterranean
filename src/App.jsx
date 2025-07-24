import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, get, push, set, update, remove, serverTimestamp, getDatabase } from "firebase/database";
import { database } from "./firebase/firebaseConfig";

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
import EditRecipe from "./components/EditRecipe";
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
    const db = getDatabase(); // Fixed: Use getDatabase() instead of getDatabase
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

  const editRecipe = (recipeId, updatedRecipe) => {
    const db = database; // Fixed: Use database directly, not database()
    const recipeRef = ref(db, `recipes/${recipeId}`);

    update(recipeRef, updatedRecipe) // Fixed: Import update function
      .then(() => {
        setRecipes(prev =>
          prev.map(recipe =>
            recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
          )
        );
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
      });
  };

  const deleteRecipe = async (recipeId) => {
    try {
      const db = database; // Fixed: Use database directly
      const recipeRef = ref(db, `recipes/${recipeId}`);
      
      await remove(recipeRef); // Fixed: Actually remove from Firebase
      
      // Update local state
      const newRecipeList = recipes.filter((recipe) => recipe.id !== recipeId); // Fixed: Use !== instead of !=
      setRecipes(newRecipeList);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage recipes={recipes} />} />
        <Route path="/recipe-list/:category?" element={<RecipeList recipes={recipes} loading={loading} />} /> {/* Fixed: typo "laoding" -> "loading" */}
        <Route path="/create" element={<AddRecipe onCreate={createNewRecipe} />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails recipe={recipes} onDelete={deleteRecipe} />} />
        <Route path="/recipes/:recipeId/edit" element={<EditRecipesLoggedUsers recipe={recipes} onEdit={editRecipe}/>} />
        <Route path="/playlist" element={<Playlist/>} />
        <Route path="/*" element={<PageNotFound />} /> {/* Moved to last to catch all unmatched routes */}
        <Route path="/about" element={<About />} />
      </Routes>

    

      <Footer/>
    </>
  );
}

export default App;