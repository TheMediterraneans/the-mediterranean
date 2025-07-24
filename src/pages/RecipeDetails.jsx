import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, remove, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditRecipe from "../components/EditRecipe";
import SpotifyEmbed from "../components/SpotifyEmbed";

function RecipeDetails() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [targetServings, setTargetServings] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${recipeId}`);

    get(recipeRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setRecipe(data);
          setTargetServings(data.servings);
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
      console.log("Attempting to save recipe:", updatedRecipe);
      console.log("Recipe ID:", recipeId);
      const db = getDatabase();
      const recipeRef = ref(db, `recipes/${recipeId}`);
      await set(recipeRef, updatedRecipe);
      console.log("Recipe saved successfully");

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
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the recipe "${recipe.title}"? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const db = getDatabase();
      const recipeRef = ref(db, `recipes/${recipeId}`);

      await remove(recipeRef);

      alert("Recipe deleted successfully!");

      navigate("/recipe-list/all");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Error deleting recipe. Please try again.");
    }
  };

  const scaleIngredient = (ingredient) => {
    const ratio = targetServings / recipe.servings;
    return {
      ...ingredient,
      quantity: Math.ceil(ingredient.quantity * ratio),
    };
  };

  if (loading)
    return (
      <div className="w-screen">
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-base-content">Loading recipe... ⏳</div>
        </div>
      </div>
    );
  if (!recipe)
    return (
      <div className="w-screen">
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-base-content">Recipe not found 😢</div>
        </div>
      </div>
    );

  if (isEditing) {
    return (
      <div>
        <EditRecipe recipe={{ id: recipeId, ...recipe }} onEdit={handleEdit} />
        <div className="w-screen bg-base-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-center">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost text-base-content"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen bg-base-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-base-content mb-2" className="home-title">
            {recipe.title}
          </h1>
        </div>

        <div className="mb-6">
          <img
            className="w-full max-w-xl mx-auto rounded object-cover"
            src={recipe.imageUrl}
            alt={recipe.title}
            style={{ maxHeight: "300px" }}
          />
        </div>

        <div className="card bg-base-100 shadow p-4 mb-6">
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-2 bg-base-200 rounded">
                <p className="text-base-content">
                  <strong>Category:</strong> {recipe.category}
                </p>
              </div>

              <div className="p-2 bg-base-200 rounded">
                <p className="text-base-content">
                  <strong>Difficulty:</strong> {recipe.difficulty}
                </p>
              </div>
            </div>

            <div className="p-2 bg-base-200 rounded">
              <h3 className="font-bold mb-2 text-base-content">Description</h3>
              <p className="text-base-content/70">{recipe.description}</p>
            </div>
          </div>

          <div className="bg-primary/20 p-3 rounded mb-4">
            <div className="flex items-center justify-center gap-2">
              <label className="font-bold text-base-content">
                Adjust Servings:
              </label>
              <input
                type="number"
                value={targetServings}
                onChange={(e) => setTargetServings(Number(e.target.value))}
                min={1}
                className="input input-bordered input-sm w-16 text-center"
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-base-content">
              Ingredients for {targetServings} servings
            </h3>
            <div className="bg-base-200 p-3 rounded">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {recipe.ingredients.map((ingredient, index) => {
                  const scaled = scaleIngredient(ingredient);
                  return (
                    <li
                      key={index}
                      className="bg-base-100 p-2 rounded border-l-2 border-primary"
                    >
                      <span className="text-base-content">
                        {scaled.quantity} {scaled.unit} {scaled.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-base-content">
              Preparation Steps
            </h3>
            <div className="bg-base-200 p-3 rounded">
              <p className="whitespace-pre-line text-base-content">
                {recipe.preparationSteps}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {recipe.notes && (
              <div className="bg-base-200 p-3 rounded">
                <h4 className="font-bold mb-1 text-base-content">Notes:</h4>
                <p className="text-base-content">{recipe.notes}</p>
              </div>
            )}

            {recipe.tags?.length > 0 && (
              <div className="bg-base-200 p-3 rounded">
                <h4 className="font-bold mb-1 text-base-content">Tags:</h4>
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="badge badge-outline">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {recipe.musicUrl && (
            <div className="bg-base-200 p-3 rounded mb-4">
              <a
                href={recipe.musicUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent btn-sm flex items-center gap-2"
              >
                🎵 Your Music Reccommendation
              </a>
            </div>
          )}

          {recipe.musicUrl && (
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2 text-base-content">
                🎵 Our Music Reccommendation
              </h3>
              <div className="bg-base-200 p-3 rounded">
                <SpotifyEmbed url={recipe.musicUrl} />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Link to="/recipe-list/all">
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white border-blue-500" style={{backgroundColor: "grey", color:"yellow"}}>
              ← Back to Recipes
            </button>
          </Link>

          <button
            onClick={() => setIsEditing(true)}
            className="btn bg-blue-500 hover:bg-blue-600 text-white border-blue-500" style={{backgroundColor:"#557D20", color:"yellow"}}
          >
            Edit Recipe
          </button>

          <button
            onClick={handleDelete}
            className="btn bg-red-500 hover:bg-red-600 text-white border-red-500" style={{backgroundColor:"orangered"}}
          >
            Delete Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
