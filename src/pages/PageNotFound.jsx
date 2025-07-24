function PageNotFound() {
    return (
        <div className="w-screen">
            <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-bold text-base-content mb-4">Page not Found :(</h1>
                <p className="text-base-content/70">The page you're looking for doesn't exist.</p>
            </div>
        </div>
    );
}

export default PageNotFound;