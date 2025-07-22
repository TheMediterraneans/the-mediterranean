import DifficultyBadge from "../components/DifficultyBadge";

function RecipeList({ recipes, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <ul className="list-row space-y-8">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="list-row">
            <div
              className="card w-full max-w-4xl mx-auto
            bg-base-100 border-2 border-warning
            rounded-2xl shadow-md
            hover:shadow-xl hover:scale-[1.02]
            transition duration-200 overflow-hidden"
            >
              {/* <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600" /> */}
              <div key={recipe.id} className="card-body flex flex-col">
                <h2 className="card-title text-2xl">{recipe.title}</h2>
                <p>Category: {recipe.category}</p>
                <div className="mt-2">
                  Difficulty: <DifficultyBadge level={recipe.difficulty} />
                </div>
                <p className="mt-2 text-secondary-content">
                  {recipe.description}
                </p>
                <p>Musical mood: {recipe.musicUrl}</p>
                <button className="btn btn-primary btn-sm">
                  View full recipe!
                </button>

                <div className="mt-auto card-actions justify-end"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
