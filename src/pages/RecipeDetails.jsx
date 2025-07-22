import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [targetServings, setTargetServings] = useState(null); // User-selected servings

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

  const scaleIngredient = (ingredient) => {
    const ratio = targetServings / recipe.servings;
    return {
      ...ingredient,
      quantity: parseFloat((ingredient.quantity * ratio).toFixed(2)), // round for clarity
    };
  };

  if (loading) return <div>Loading recipe... ⏳</div>;
  if (!recipe) return <div>Recipe not found 😢</div>;

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

      <Link to="recipe-list">
        <button>Detlete this recipe</button>
      </Link>
    </div>
  );
}

export default RecipeDetails;
