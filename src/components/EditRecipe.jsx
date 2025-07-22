import React, { useState, useEffect } from 'react';

function EditRecipe ({ recipe, onEdit }) {
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

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || '');
      setDescription(recipe.description || '');
      setIngredients(recipe.ingredients || []);
      setImageUrl(recipe.imageUrl || '');
      setCategory(recipe.category || '');
      setPrepTime(recipe.prepTime || 0);
      setServings(recipe.servings || 1);
      setTags((recipe.tags || []).join(', '));
      setMood(recipe.mood || '');
      setPreparationSteps(recipe.preparationSteps || '');
      setMusicUrl(recipe.musicUrl || '');
      setNotes(recipe.notes || '');
    }
  }, [recipe]);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  // const addIngredient = () => {
  //   setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  // };

  const handleSubmit = () => {
    if (!title.trim())
    const updatedRecipe = {
      title,
      description,
      category,
      difficulty: recipe.difficulty || 'easy',
      imageUrl,
      ingredients,
      mood,
      musicUrl,
      notes,
      prepTime: Number(prepTime),
      preparationSteps,
      servings: Number(servings),
      tags: tags.split(',').map(tag => tag.trim()),
    };

  

  return (
    <div>
      <h2>Edit Recipe: {recipe.title}</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input placeholder="Name" value={ingredient.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} />
          <input placeholder="Quantity" value={ingredient.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)} />
          <input placeholder="Unit" value={ingredient.unit} onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)} />
        </div>
      ))}
      <button onClick={addIngredient}>Add Ingredient</button>
      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
      <input value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="Prep Time" type="number" />
      <input value={servings} onChange={(e) => setServings(e.target.value)} placeholder="Servings" type="number" />
      <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
      <input value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Mood" />
      <textarea value={preparationSteps} onChange={(e) => setPreparationSteps(e.target.value)} placeholder="Preparation Steps" />
      <input value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)} placeholder="Music URL" />
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};
};

export default EditRecipe;