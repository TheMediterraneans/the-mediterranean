function Playlist() {
  return (

    <div className="w-screen bg-base-200 pt-16" style={{height: 'calc(100vh - 144px)'}} id="playlistPage">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 home-title">🎶 Playlist For Your Mood</h1>
          <h2 className="text-lg text-base-content/70 max-w-2xl mx-auto"><i>
            Each moment of your life and day has a playlist, look out our selection
            to listen while cooking, dining, discussing with the persons of your
            life or just relaxing!</i>
          </h2>
        </div>

        {/* Playlist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="card bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">❤️‍🔥</p>
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1EIgLa2MeumXju?si=ajsdrgUhRkSrSzy-SNkoIQ"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Romantic Dinner
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">🌈</p>
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1DWYBO1MoTDhZI?si=XStdkccQQZiIH0fnFXT2uQ"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Good vibes
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">🎂</p>
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1DWYtQSOiZF6hj?si=MGiuToVDSLqp7PMyDFpzUw"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Happy birthday
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">☀️</p>
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1EIhxsZ1zwdwMW?si=91CGfL43Q6u74-MLSn6e1Q"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Good morning
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">🎵</p>
              <a
                href="https://open.spotify.com/playlist/42eLtt8RUBboyXLmNQWU5a?si=0lGl5jaLTJOL1MTDjmiRmw"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Chill
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">👩🏽‍🍳</p>
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1EIgwQ63EuQCPo?si=dCuyFpeQSYGWZOFiJjDM7w"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Feel Good Cooking
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">🍝</p>
              <a
                href="https://open.spotify.com/playlist/0Vfh7Hiif45z9LdmyX1gVF?si=H9V24lm9TeiFbU62ssCPVw"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Dinner Chill
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">🥑</p>
              <a
                href="https://open.spotify.com/playlist/093IzRWO5nYZCoSK2C2YrJ?si=sFKQ6HvnSy-SS72iL5OHzw"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Brunch music
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">✈️</p>
              <a
                href="https://open.spotify.com/playlist/6Csz85e5CaohPBc2hggxGY?si=z0OrjGcKQrC_jwU9hS8hqQ"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Travel music
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">🪩</p>
              <a
                href="https://open.spotify.com/playlist/5xS3Gi0fA3Uo6RScucyct6?si=e6XF__L_STuXER4nzDJY0Q"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Party music
              </a>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="card-body">
              <p className="text-2xl mb-2">🦁</p>
              <a
                href="https://open.spotify.com/playlist/3jbslfKMLLri91JYUXqEKz?si=dE9uj48HQbejnJI_MNEtdg"
                target="_blank"
                rel="noreferrer"
                className="card-title hover:underline playlist-title"
              >
                Motivation
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Playlist;