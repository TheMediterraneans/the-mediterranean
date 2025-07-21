import { Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import CreateAccount from "./pages/CreateAccount";
import Playlist from "./components/Playlist";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebase/firebaseConfig";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
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

    fetchRecipes();
  }, []);


  return (
    <>
    <RecipeList recipes={recipes} loading={loading} />
    </>
  )
}

export default App;
