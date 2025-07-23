import { Link, useParams } from "react-router-dom";
import DifficultyBadge from "../components/DifficultyBadge";

function RecipeList({ recipes, loading }) {
  const { category } = useParams();

  const filteredRecipes =
    category === "all"
      ? recipes
      : recipes.filter((recipe) => {
          return recipe.category === category;
        });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/create">
        <button>Create a new recipe</button>
      </Link>

      <div className="container mx-auto px-6 py-8">
        <ul className="list-row space-y-8">
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id} className="list-row">
              <div
                className="card w-full max-w-4xl mx-auto
                bg-base-100 border-2 border-warning
                rounded-2xl shadow-md
                hover:shadow-xl hover:scale-[1.02]
                transition duration-200 overflow-hidden"
              >
                {/* <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600" /> */}
                <div className="card-body flex flex-col">
                  <h2 className="card-title text-2xl">{recipe.title}</h2>
                  <p>Category: {recipe.category}</p>
                  <div className="mt-2">
                    Difficulty: <DifficultyBadge level={recipe.difficulty} />
                  </div>
                  <p className="mt-2 text-secondary-content">
                    {recipe.description}
                  </p>
                  <p>
                    🎵{" "}
                    <a href={recipe.musicUrl} target="_blank" rel="noreferrer">
                      Cooking Mood
                    </a>
                  </p>
                  <Link to={`/recipes/${recipe.id}`}>
                    <button className="btn btn-primary btn-sm">
                      View full recipe!
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeList;
