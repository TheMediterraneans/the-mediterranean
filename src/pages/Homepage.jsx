import { Link } from "react-router-dom";

function Homepage({ recipes, setSelectedCategory }) {
  // take recipe categories from recipe props and return all the categories in a new array
  const categories = recipes.map((recipe) => {
    return recipe.category;
  });
  // deduplicate the recipe categories in the new array
  const uniqueCategories = [];
  for (let category of categories) {
    if (!uniqueCategories.includes(category)) {
      uniqueCategories.push(category);
    }
  }

  // state update function from props to updated the view of the recipe list page
  const updateSelectedCategory = () => setSelectedCategory("");
  //return a link to recipe list page that triggers event to update state to match the category of the link
  function displayCategory(category, categoryName) {
    return (
      <Link to="/recipe-list" key={category}>
        <button onClick={() => setSelectedCategory(category)}>
          {categoryName}
        </button>
      </Link>
    );
  }

  return (
    <div>
      <div className="w-screen min-h-screen bg-base-200">
        {/* <div >
              {displayCategory("", "all recipes")}
              {uniqueCategories.map((category) => displayCategory(category, category))}
            </div> */}

        <div className="flex justify-center">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="max-w-5xl mx-auto px-4 text-center">Welcome to Foodlings</h1>
            <p className="mb-6">
              Discover delicious recipes, find music to cook to and eat to!
            </p>

            <div className="grid 
                grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                gap-y-12
                gap-x-12
                w-full 
                max-w-screen-xl
                mx-auto
                px-4">
              {uniqueCategories.map((category) => (
                <Link to="/recipe-list" key={category}>
                  <div
                    onClick={() => setSelectedCategory(category)}
                    className="
                  bg-primary/50 text-primary-content
                  rounded-lg
                  aspect-square
                  w-[300px]
                  flex items-center justify-center
                  p-6
                  cursor-pointer
                  transition-all duration-200
                  hover:bg-primary-focus hover:scale-105 hover:shadow-xl"
                  >
                    <span className="text- font-semibold">{category}</span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
