function SpotifyEmbed() {

    const dummyUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DWYtQSOiZF6hj?utm_source=generator";

    return (
        <div className="w-full max-w-md mx-auto">
            {dummyUrl ? (
                // the style below is important, it hides the weird white corners of Spotify's iframe
                <div className="mx-auto" style={{ borderRadius: "25px", overflow: "hidden" }} >
                    <iframe
                        src={dummyUrl}
                        width="100%"
                        height="512"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        style={{
                            border: "none",
                            borderRadius: "12px",
                            display: "block",
                        }}
                    />
                </div>
            ) : (
                <p className="text-red-500 text-center">Invalid or unsupported Spotify URL</p>
            )}
        </div>
    );
}

export default SpotifyEmbed;