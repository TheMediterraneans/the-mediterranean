import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, set } from "firebase/database";
import EditRecipe from "../components/EditRecipe";

function EditRecipesLoggedUsers({ onEdit }) {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${recipeId}`);

    get(recipeRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setRecipe({ id: recipeId, ...data }); // attach id to recipe
        } else {
          console.warn("No recipe found for this ID.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) return <div>Loading recipe… 🍳</div>;
  if (!recipe) return <div>Recipe not found 😢</div>;

  const handleEdit = async (id, updatedRecipe) => {
  try {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${recipeId}`);
    await set(recipeRef, updatedRecipe); // only override the node of the involved recipe
    alert("Recipe updated succesfully");

    navigate (`/recipes/${recipeId}`);

  } catch (error) {
    console.error("Error saving changes:", error);
    alert("Error saving changes");
  }

  
};

  return (
    <div>
      <h2 className="edit-recipe-title">Edit Recipe</h2>
      <EditRecipe recipe={recipe} onEdit={handleEdit} />
    </div>
  );
}

export default EditRecipesLoggedUsers;