import { useParams } from "react-router-dom";
function RecipeDetails() {

    const {recipeId} = useParams()
    return (
        <div>
      <h2>Recipe Detail</h2>
      <p>Recipe ID: {recipeId}</p>
      <h3> {recipeId.title} </h3>
    </div>

    )
}

export default RecipeDetails;