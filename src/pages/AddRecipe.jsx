import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";


function CreateRecipe({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("appetizer");
  const [prepTime, setPrepTime] = useState(0);
  const [servings, setServings] = useState(1);
  const [tags, setTags] = useState("");
  const [mood, setMood] = useState("");
  const [preparationSteps, setPreparationSteps] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const handleSubmit = () => {
    const newRecipe = {
      title,
      description,
      category,
      difficulty: "easy",
      imageUrl,
      ingredients,
      mood,
      musicUrl,
      notes,
      prepTime: Number(prepTime),
      preparationSteps,
      servings: Number(servings),
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    onCreate(newRecipe);

    // Optional: reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setIngredients([{ name: "", quantity: "", unit: "" }]);
    setImageUrl("");
    setPrepTime(0);
    setServings(1);
    setTags("");
    setMood("");
    setPreparationSteps("");
    setMusicUrl("");
    setNotes("");
  };

  return (
    <div>
      <h2>Create a New Recipe</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        <option value="appetizer">Appetizer</option>
        <option value="main-course">Main Course</option>
        <option value="second-course">Second Course</option>
        <option value="sides">Sides</option>
        <option value="desserts">Desserts</option>
        <option value="snacks">Snacks</option>
      </select>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <label>Ingredients: 
          <input
            placeholder="Name"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
          />
          <input
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) =>
              handleIngredientChange(index, "quantity", e.target.value)
            }
          />
          
          <input
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) =>
              handleIngredientChange(index, "unit", e.target.value)
            }
          />
          </label>
        </div>
      ))}
      <button onClick={addIngredient}>Add Ingredient</button>
      <label>
        Image:
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
        />
      </label>

      <label>
        Preparation Time:
        <input
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="Prep Time (min)"
          type="number"
        />
      </label>

      <label>
        Servings:
        <input
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          placeholder="Servings"
          type="number"
        />
      </label>

      <label>
        Tags:
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
      </label>

      <label>
        Mood:
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Mood"
        />
      </label>

      <label>
        Steps:
        <textarea
          value={preparationSteps}
          onChange={(e) => setPreparationSteps(e.target.value)}
          placeholder="Preparation Steps"
        />
      </label>

      <label>
        Music Link:
        <input
          value={musicUrl}
          onChange={(e) => setMusicUrl(e.target.value)}
          placeholder="Music URL"
        />
      </label>

      <label>
        Diary  Notes:
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />
      </label>
      <button onClick={handleSubmit}>Create Recipe</button>
    </div>
  );
}

function AddRecipe() {
  const handleCreate = async (recipe) => {
    try {
      const db = getDatabase();
      const recipesRef = ref(db, "recipes");
      await push(recipesRef, recipe);
      alert("Recipe created successfully!");
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Error creating recipe");
    }
  };


  return <CreateRecipe onCreate={handleCreate} />;
}

export default AddRecipe;
