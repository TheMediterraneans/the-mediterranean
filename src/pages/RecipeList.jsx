
import { useState, useEffect } from "react";


function RecipeList({ recipes, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2>Recipe list</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h1>Title: {recipe.title}</h1>
          <h3>Description: {recipe.description}</h3>
          <h3>Difficulty: {recipe.difficulty}</h3>
          <p>Cooking mood: {recipe.musicUrl}</p>
        </div>
      ))}
    </>
  );
}


export default RecipeList;