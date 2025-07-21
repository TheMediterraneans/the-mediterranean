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

function App() {


  return (
    <>
    <RecipeList />
    </>
  )
}

export default App;
