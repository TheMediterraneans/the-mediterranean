function SpotifyEmbed({ url }) {


    return (
        <div className="w-full max-w-md mx-auto">
            {url ? (
                // the style below is important, it hides the weird white corners of Spotify's iframe
                <div className="mx-auto" style={{ borderRadius: "25px", overflow: "hidden" }} >
                    <iframe
                        src={url}
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