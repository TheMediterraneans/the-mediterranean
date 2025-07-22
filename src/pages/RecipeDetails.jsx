import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, remove, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditRecipe from "../components/EditRecipe";

function RecipeDetails() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [targetServings, setTargetServings] = useState(null); // User-selected servings
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${recipeId}`);

    get(recipeRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setRecipe(data);
          setTargetServings(data.servings); // default to original
        } else {
          console.warn("Recipe not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      });
  }, [recipeId]);

  const handleEdit = async (id, updatedRecipe) => {
    try {
        console.log('Attempting to save recipe:', updatedRecipe);
      console.log('Recipe ID:', recipeId);
      const db = getDatabase();
      const recipeRef = ref(db, `recipes/${recipeId}`);
      await set(recipeRef, updatedRecipe);
      console.log('Recipe saved successfully');
      
      // Update local state with the new recipe data
      setRecipe(updatedRecipe);
      setTargetServings(updatedRecipe.servings);
      setIsEditing(false);
      
      alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Error saving changes");
    }
  };

  const handleDelete = async () => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the recipe "${recipe.title}"? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const db = getDatabase();
      const recipeRef = ref(db, `recipes/${recipeId}`);
      
      // Remove the recipe from Firebase
      await remove(recipeRef);
      
      alert("Recipe deleted successfully!");
      
      // Navigate back to recipe list
      navigate("/recipe-list");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Error deleting recipe. Please try again.");
    }
  };

  const scaleIngredient = (ingredient) => {
    const ratio = targetServings / recipe.servings;
    return {
      ...ingredient,
      quantity: Math.ceil(ingredient.quantity * ratio), // round to integer
    };
  };

  if (loading) return <div>Loading recipe... ⏳</div>;
  if (!recipe) return <div>Recipe not found 😢</div>;

  if (isEditing) {
    return (
        <div>
            <h2>Edit Recipe</h2>
            <EditRecipe recipe={{id: recipeId,...recipe}} onEdit={handleEdit}/>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
    )
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        style={{ maxWidth: "300px" }}
      />
      <p>
        <strong>Category:</strong> {recipe.category}
      </p>
      <p>
        <strong>Description:</strong> {recipe.description}
      </p>
      <p>
        <strong>Difficulty:</strong> {recipe.difficulty}
      </p>
      <p>
        <strong>Original Servings:</strong> {recipe.servings}
      </p>

      {/* Servings Modifier */}
      <label>
        <strong>Adjust Servings:</strong>
        <input
          type="number"
          value={targetServings}
          onChange={(e) => setTargetServings(Number(e.target.value))}
          min={1}
          style={{ marginLeft: "10px", width: "60px" }}
        />
      </label>

      <h3>Ingredients for {targetServings} servings:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => {
          const scaled = scaleIngredient(ingredient);
          return (
            <li key={index}>
              {scaled.quantity} {scaled.unit} {scaled.name}
            </li>
          );
        })}
      </ul>

      <h3>Preparation Steps:</h3>
      <p>{recipe.preparationSteps}</p>

      {recipe.musicUrl && (
        <p>
          🎵{" "}
          <a href={recipe.musicUrl} target="_blank" rel="noreferrer">
            Listen while cooking
          </a>
        </p>
      )}
      {recipe.notes && (
        <p>
          <strong>Notes:</strong> {recipe.notes}
        </p>
      )}
      {recipe.tags?.length > 0 && (
        <p>
          <strong>Tags:</strong> {recipe.tags.join(", ")}
        </p>
      )}

      {/* Action buttons */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/recipe-list">
          <button style={{ marginRight: "10px" }}>Back to Recipes</button>
        </Link>

        <button 
          onClick={() => setIsEditing(true)}
          style={{ 
            marginRight: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Edit Recipe
        </button>
        
        
        <button 
          onClick={handleDelete}>
          Delete Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;