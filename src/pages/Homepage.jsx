function Homepage() {
  return (
    
    <div>
      
      <div className="w-screen min-h-screen bg-base-200">
        
        {/* inner content automatically centered */}
        <div className="hero-content text-center">
          
          <div className="max-w-lg">
            
            <h1 className="text-5xl font-bold mb-4">Welcome to Foodlings</h1>
            <p className="mb-6">
              Discover delicious recipes, find music to cook to and eat to!
            </p>
            {/* On the button here add link to all recipe categories probably */}
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
