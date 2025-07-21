import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import EditRecipe from "../components/EditRecipe";

function EditRecipesLoggedUsers({ onEdit }) {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2>Edit Recipe</h2>
      <EditRecipe recipe={recipe} onEdit={onEdit} />
    </div>
  );
}

export default EditRecipesLoggedUsers;