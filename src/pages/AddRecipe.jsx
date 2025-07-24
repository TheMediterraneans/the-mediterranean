
import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { Link } from "react-router-dom";

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
  const [errors, setErrors] = useState({});

  // Required fields configuration
  const requiredFields = {
    title: "Recipe title is required",
    description: "Description is required", 
    category: "Category is required",
    preparationSteps: "Preparation steps are required"
  };

  // Validation function for individual fields
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    if (requiredFields[fieldName] && !value.trim()) {
      newErrors[fieldName] = requiredFields[fieldName];
    } else {
      delete newErrors[fieldName];
    }
    
    // Special validation for numeric fields
    if (fieldName === 'prepTime' && (value <= 0 || isNaN(value))) {
      newErrors[fieldName] = "Prep time must be a number greater than 0";
    } else if (fieldName === 'prepTime' && value > 0) {
      delete newErrors[fieldName];
    }
    
    if (fieldName === 'servings' && (value <= 0 || isNaN(value))) {
      newErrors[fieldName] = "Servings must be a number greater than 0";
    } else if (fieldName === 'servings' && value > 0) {
      delete newErrors[fieldName];
    }
    
    setErrors(newErrors);
  };

  // Validate ingredients
  const validateIngredients = () => {
    const validIngredients = ingredients.filter(
      ing => ing.name.trim() && ing.quantity.trim()
    );
    
    const newErrors = { ...errors };
    if (validIngredients.length === 0) {
      newErrors.ingredients = "At least one complete ingredient is required";
    } else {
      delete newErrors.ingredients;
    }
    
    setErrors(newErrors);
    return validIngredients.length > 0;
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    validateField('title', value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    validateField('description', value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    validateField('category', value);
  };

  const handlePreparationChange = (e) => {
    const value = e.target.value;
    setPreparationSteps(value);
    validateField('preparationSteps', value);
  };

  const handlePrepTimeChange = (e) => {
    const value = e.target.value;
    setPrepTime(value);
    validateField('prepTime', value);
  };

  const handleServingsChange = (e) => {
    const value = e.target.value;
    setServings(value);
    validateField('servings', value);
  };



  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);

    setTimeout(() => validateIngredients(), 100);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };
  
  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const updated = ingredients.filter((_, i) => i !== index);
      setIngredients(updated);
      setTimeout(() => validateIngredients(), 100);
    }
  };

  const isFormValid = () => {
    const hasRequiredFields = title.trim() && description.trim() && category && preparationSteps.trim();
    const hasValidNumbers = prepTime > 0 && servings > 0;
    const hasValidIngredients = ingredients.some(ing => ing.name.trim() && ing.quantity.trim());
    const hasNoErrors = Object.keys(errors).length === 0;
    
    return hasRequiredFields && hasValidNumbers && hasValidIngredients && hasNoErrors;
  };

  const handleSubmit = () => {

    validateField('title', title);
    validateField('description', description);
    validateField('category', category);
    validateField('preparationSteps', preparationSteps);
    validateField('prepTime', prepTime);
    validateField('servings', servings);
    validateIngredients();

    if (!isFormValid()) {
      alert("Please fill in all required fields correctly");
      return;
    }
    const newRecipe = {
      title,
      description,
      category,
      difficulty: "easy",
      imageUrl,
      ingredients: ingredients.filter(ing => ing.name.trim()),
      mood,
      musicUrl,
      notes,
      prepTime: Number(prepTime),
      preparationSteps,
      servings: Number(servings),
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    onCreate(newRecipe);

    
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
    setErrors({});
  };

  return (
    <div className="w-screen bg-base-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-base-content mb-2">Create a New Recipe</h1>
        </div>
        
        <div className="mb-6 text-center">
          <Link to="/recipe-list/all">
            <button className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-300">
              ← Back to Recipes
            </button>
          </Link>
        </div>

        <div className="space-y-6">
          
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-lg font-bold text-base-content mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Recipe Title</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter recipe title"
                />
                {errors.title && (
                  <div className="label">
                    <span className="label-text-alt text-error">{errors.title}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-24"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe your recipe..."
                />
                {errors.description && (
                  <div className="label">
                    <span className="label-text-alt text-error">{errors.description}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select 
                  className="select select-bordered w-full" 
                  value={category} 
                  onChange={handleCategoryChange}
                >
                  <option value="">Select category</option>
                  <option value="appetizers">Appetizers</option>
                  <option value="main-course">Main Course</option>
                  <option value="second-course">Second Course</option>
                  <option value="sides">Sides</option>
                  <option value="desserts">Desserts</option>
                  <option value="snacks">Snacks</option>
                  
                </select>
                {errors.category && (
                  <div className="label">
                    <span className="label-text-alt text-error">{errors.category}</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Prep Time (min)</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={prepTime}
                    onChange={handlePrepTimeChange}
                    placeholder="30"
                    type="number"
                    min="1"
                  />
                  {errors.prepTime && (
                    <div className="label">
                      <span className="label-text-alt text-error">{errors.prepTime}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Servings</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={servings}
                    onChange={handleServingsChange}
                    placeholder="4"
                    type="number"
                    min="1"
                  />
                  {errors.servings && (
                    <div className="label">
                      <span className="label-text-alt text-error">{errors.servings}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Image URL</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-lg font-bold text-base-content mb-4">Ingredients</h3>
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-base-200 rounded">
                  <input
                    className="input input-bordered input-sm"
                    placeholder="Ingredient name"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    className="input input-bordered input-sm"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                  />
                  <input
                    className="input input-bordered input-sm"
                    placeholder="Unit (cups, tbsp, etc)"
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                  />
                  {ingredients.length > 1 && (
                    <button 
                      className="btn btn-error btn-sm"
                      onClick={() => removeIngredient(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button 
                className="btn btn-outline btn-sm gap-2" 
                onClick={addIngredient}
              >
                <span className="text-lg">+</span>
                Add Ingredient
              </button>
              {errors.ingredients && (
                <div className="alert alert-error">
                  <span>{errors.ingredients}</span>
                </div>
              )}
            </div>
          </div>

          
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-lg font-bold text-base-content mb-4">Preparation Steps</h3>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              value={preparationSteps}
              onChange={handlePreparationChange}
              placeholder="Describe the step-by-step preparation process..."
            />
            {errors.preparationSteps && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.preparationSteps}</span>
              </div>
            )}
          </div>

          
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-lg font-bold text-base-content mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Tags (comma-separated)</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="italian, vegetarian, quick"
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text font-medium">Your Music URL 🎵</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  placeholder="Spotify or YouTube URL for cooking mood"
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text font-medium">Personal Notes</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-24"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your personal tips and notes..."
                />
              </div>
            </div>
          </div>

          
          <div className="text-center">
            <button 
              className={`btn btn-wide gap-2 ${
                isFormValid() 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' 
                  : 'btn-disabled'
              }`}
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              <span className="text-lg">✨</span>
              Create Recipe
            </button>
            {!isFormValid() && (
              <p className="text-sm text-base-content/70 mt-2">
                Please complete all required fields to create the recipe
              </p>
            )}
          </div>
        </div>
      </div>
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
