
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

  if (loading) return <div className="w-screen"><div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center"><div className="text-base-content">Loading recipes... ⏳</div></div></div>;

  return (
    <div className="w-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-6" className="home-title">
            {category === "all" ? "All Recipes" : `${category.charAt(0).toUpperCase() + category.slice(1)} Recipes`}
          </h1>
          <Link to="/create">
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white border-blue-500 btn-wide gap-2" className="action-button">
              <span className="text-lg">+</span>
              Create New Recipe
            </button>
          </Link>
        </div>

        <div className="space-y-6">
          <ul className="space-y-6">
            {filteredRecipes.map((recipe) => (
              <li key={recipe.id}>
                <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="card-title text-2xl text-base-content">{recipe.title}</h2>
                      <DifficultyBadge level={recipe.difficulty} />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge badge-outline">{recipe.category}</span>
                    </div>
                    
                    <p className="text-base-content/80 mb-4">
                      {recipe.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-base-content/70">
                        <span className="text-lg">🎵</span>
                        <a 
                          href={recipe.musicUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="link link-primary hover:link-hover font-medium text-sm"
                        >
                          Listen while cooking
                        </a>
                      </div>
                      <Link to={`/recipes/${recipe.id}`}>
                        <button className="btn bg-blue-500 hover:bg-blue-600 text-white border-blue-500 btn-sm normal-case gap-1" className="button-view">
                          View Recipe
                          <span className="text-xs">→</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
