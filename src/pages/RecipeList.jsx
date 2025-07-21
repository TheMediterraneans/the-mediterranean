import firebase from "firebase/compat/app";
import { useState, useEffect } from "react";
import { getRecipeList } from "../components/RecipeServices";

function RecipeList() {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecipeList()
        .then((response) => {
            if (response) {
                const recipesArr = Object.keys(response).map(key => ({
                    id: key,
                    ...response[key]
                }))
                setRecipes[recipesArr]
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <>
        <h1>Recipe list</h1>

        {recipes.map((recipe) => {
            return (
                <div key={recipe.id}>
                    <h1>Title: {recipe.title}</h1>
                    <h3>Desciption: {recipe.description}</h3>
                    <h3>Difficulty: {recipe.difficulty}</h3>
                    <p>Cooking mood: {recipe.musiscUrl}</p>
                </div>
            )
        })}
        </>
    )
}

export default RecipeList;