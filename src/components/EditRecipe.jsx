import { useState, useEffect } from 'react';

const EditRecipe = ({ recipe, onEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState(0);
  const [servings, setServings] = useState(1);
  const [tags, setTags] = useState('');
  const [mood, setMood] = useState('');
  const [preparationSteps, setPreparationSteps] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [notes, setNotes] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Required fields configuration
  const requiredFields = {
    title: "Recipe title is required",
    description: "Description is required", 
    category: "Category is required",
    preparationSteps: "Preparation steps are required"
  };

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || '');
      setDescription(recipe.description || '');
      
      // Fix: Ensure ingredients have string values and proper structure
      const processedIngredients = (recipe.ingredients || []).map(ingredient => ({
        name: String(ingredient.name || ''),
        quantity: String(ingredient.quantity || ''), // Convert to string
        unit: String(ingredient.unit || '')
      }));
      
      // Ensure at least one ingredient row exists
      if (processedIngredients.length === 0) {
        processedIngredients.push({ name: "", quantity: "", unit: "" });
      }
      
      setIngredients(processedIngredients);
      setImageUrl(recipe.imageUrl || '');
      setCategory(recipe.category || '');
      setPrepTime(recipe.prepTime || 0);
      setServings(recipe.servings || 1);
      setTags((recipe.tags || []).join(', '));
      setMood(recipe.mood || '');
      setPreparationSteps(recipe.preparationSteps || '');
      setMusicUrl(recipe.musicUrl || '');
      setNotes(recipe.notes || '');

      // Clear errors when loading new recipe
      setErrors({});
    }
  }, [recipe]);

  // Validation function for individual fields
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    if (requiredFields[fieldName] && !String(value).trim()) {
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

  // Validate ingredients - Fix: Convert to string before calling trim()
  const validateIngredients = () => {
    const validIngredients = ingredients.filter(
      ing => String(ing.name || '').trim() && String(ing.quantity || '').trim()
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

  // Enhanced change handlers with validation
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
    updated[index][field] = String(value); // Ensure it's always a string
    setIngredients(updated);
    
    // Validate ingredients after change
    setTimeout(() => validateIngredients(), 100);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const updated = ingredients.filter((_, i) => i !== index);
      setIngredients(updated);
      setTimeout(() => validateIngredients(), 100);
    }
  };

  // Check if form is valid - Fix: Convert to string before trim()
  const isFormValid = () => {
    const hasRequiredFields = String(title).trim() && String(description).trim() && category && String(preparationSteps).trim();
    const hasValidNumbers = prepTime > 0 && servings > 0;
    const hasValidIngredients = ingredients.some(ing => String(ing.name || '').trim() && String(ing.quantity || '').trim());
    const hasNoErrors = Object.keys(errors).length === 0;
    
    return hasRequiredFields && hasValidNumbers && hasValidIngredients && hasNoErrors;
  };

  const handleSubmit = () => {
    // Final validation
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

    // Fix: Ensure ingredients are properly filtered and processed
    const processedIngredients = ingredients
      .filter(ing => String(ing.name || '').trim()) // Filter out empty ingredients
      .map(ing => ({
        name: String(ing.name || '').trim(),
        quantity: String(ing.quantity || '').trim(),
        unit: String(ing.unit || '').trim()
      }));

    const updatedRecipe = {
      title: String(title).trim(),
      description: String(description).trim(),
      category,
      difficulty: recipe.difficulty || 'easy',
      imageUrl: String(imageUrl).trim(),
      ingredients: processedIngredients,
      mood: String(mood).trim(),
      musicUrl: String(musicUrl).trim(),
      notes: String(notes).trim(),
      prepTime: Number(prepTime),
      preparationSteps: String(preparationSteps).trim(),
      servings: Number(servings),
      tags: String(tags).split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    onEdit(recipe.id, updatedRecipe);
  };

  return (
    <div className="w-screen bg-base-200 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-base-content mb-2" className="edit-recipe-title">Edit Recipe: {recipe?.title}</h1>
          <p className="text-sm text-base-content/70">Fields marked with <span className="text-error">*</span> are required</p>
        </div>
        
        <div className="space-y-6">
          
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-lg font-bold text-base-content mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Recipe Title <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  className={`input input-bordered w-full rounded-sm ${errors.title ? 'input-error border-error' : ''}`}
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
                  <span className="label-text font-medium">
                    Description <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  className={`textarea textarea-bordered w-full h-24 rounded-sm ${errors.description ? 'textarea-error border-error' : ''}`}
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
                  <span className="label-text font-medium">
                    Category <span className="text-error">*</span>
                  </span>
                </label>
                <select 
                  className={`select select-bordered w-full rounded-sm ${errors.category ? 'select-error border-error' : ''}`}
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
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="drinks">Drinks</option>
                  <option value="salads">Salads</option>
                  <option value="soups">Soups</option>
                  <option value="pasta">Pasta</option>
                  <option value="pizza">Pizza</option>
                  <option value="seafood">Seafood</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-Free</option>
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
                    <span className="label-text font-medium">
                      Prep Time (min) <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    className={`input input-bordered w-full rounded-sm ${errors.prepTime ? 'input-error border-error' : ''}`}
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
                    <span className="label-text font-medium">
                      Servings <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    className={`input input-bordered w-full rounded-sm ${errors.servings ? 'input-error border-error' : ''}`}
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
                    className="input input-bordered w-full rounded-sm"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-lg font-bold text-base-content mb-4">
              Ingredients <span className="text-error">*</span>
            </h3>
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-base-200 rounded">
                  <input
                    className="input input-bordered input-sm rounded-sm"
                    placeholder="Ingredient name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  />
                  <input
                    className="input input-bordered input-sm rounded-sm"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  />
                  <input
                    className="input input-bordered input-sm rounded-sm"
                    placeholder="Unit (cups, tbsp, etc)"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  />
                  {ingredients.length > 1 && (
                    <button 
                      className="btn btn-error btn-sm" className="delete-button-style"
                      onClick={() => removeIngredient(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                className="btn btn-outline btn-sm gap-2" className="action-button"
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
            <h3 className="text-lg font-bold text-base-content mb-4">
              Preparation Steps <span className="text-error">*</span>
            </h3>
            <textarea
              className={`textarea textarea-bordered w-full h-32 rounded-sm ${errors.preparationSteps ? 'textarea-error border-error' : ''}`}
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
                  className="input input-bordered w-full rounded-sm"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="italian, vegetarian, quick"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Music URL 🎵</span>
                </label>
                <input
                  className="input input-bordered w-full rounded-sm"
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
                  className="textarea textarea-bordered w-full h-24 rounded-sm"
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
              <span className="text-lg">💾</span>
              Save Changes
            </button>
            {!isFormValid() && (
              <p className="text-sm text-base-content/70 mt-2">
                Please complete all required fields to save the recipe
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;