import { Link } from "react-router-dom";

function Homepage({ recipes }) {
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

  // category to image mapping
  const categoryImages = {
    "appetizers": "https://res.cloudinary.com/dr1xea5ry/image/upload/v1753282453/Cajun_Shrimp_Appetizer_Verticle_zkgl0z.jpg",
    "sides": "https://res.cloudinary.com/dr1xea5ry/image/upload/v1753281990/Lobster-Salad-Lasarte-Review-Menu-2_281_of_1_29_rdwtts.jpg",
    "second-course": "https://res.cloudinary.com/dr1xea5ry/image/upload/v1753282217/Tangelo_and_tarragon_stuffed_chicken_breasts_enx7z5.jpg",
    "main-course": "https://res.cloudinary.com/dr1xea5ry/image/upload/v1753281808/90_ygdgip.jpg",
    "desserts": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop&crop=center",
    "drinks": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center",
    "breakfast": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop&crop=center",
    "lunch": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&crop=center",
    "dinner": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=400&fit=crop&crop=center",
    "snacks": "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop&crop=center",
    "salads": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&crop=center",
    "soups": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop&crop=center",
    "pasta": "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=400&fit=crop&crop=center",
    "pizza": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop&crop=center",
    "seafood": "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop&crop=center",
    "vegetarian": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&crop=center",
    "vegan": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop&crop=center",
    "gluten-free": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop&crop=center",
    // default fallback image
    "default": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop&crop=center"
  };

  // function to get image for category
  const getCategoryImage = (category) => {
    const normalizedCategory = category.toLowerCase();
    return categoryImages[normalizedCategory] || categoryImages["default"];
  };

  // function to capitalize category names nicely
  const formatCategoryName = (category) => {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

    //return a link to recipe list page based on the category
  function displayCategory(category, categoryName) {
    const imageUrl = getCategoryImage(category);
    
    return (
      <Link to={`/recipe-list/${category}`} key={category}>
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden border border-base-200">

          <figure className="aspect-square overflow-hidden">
            <img 
              src={imageUrl} 
              alt={`${categoryName} category`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.src = categoryImages["default"];
              }}
            />
          </figure>
          
          <div className="card-body absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-white mt-10 text-2xl font-extrabold drop-shadow-2xl tracking-wider uppercase mb-2 transform transition-transform duration-300 hover:scale-105" style={{color:"white"}}>
                {formatCategoryName(categoryName)}
              </h3>
              <div className="w-16 h-0.5 bg-white/80 mx-auto rounded-full"></div>
            </div>
          </div>
          
          <div className="badge bg-yellow-400 text-white border-b-yellow-300 badge-lg absolute top-3 right-3 shadow-md">
            {recipes.filter(recipe => recipe.category === category).length}
          </div>
        </div>
      </Link>
    );
  }

  return (

      <div className="w-screen">
        <div className="flex justify-center">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="max-w-5xl mx-auto px-4 text-center text-4xl font-bold mb-4 home-title">
              Welcome to Foodlings
            </h1>
            <p className="mb-8 text-lg text-base-content/70" id="home-text">
              Discover delicious recipes, find music to cook to and eat to!
            </p>

            <div
              className="grid 
                grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                gap-6
                w-full 
                max-w-screen-xl 
                mx-auto 
                px-4"
            >
              {uniqueCategories.map((category) =>
                displayCategory(category, category)
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Homepage;
