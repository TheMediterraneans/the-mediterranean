const spotifyPlaylists = [
  "https://open.spotify.com/embed/playlist/1CijwUEPeh1br84CbtV76I?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator",
  "https://open.spotify.com/embed/playlist/5Zl0d8xyn1ppQN1tmKffCF?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWVsh2vXzlKFb?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX3Fzl4v4w9Zp?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWU13kKnk03AP?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWYV7OOaGhoH0?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX2yvmlOdMYzV?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX5Ozry5U6G0d?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX8xfQRRX1PDm?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1EIeCq6BixlUVj?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX36edUJpD76c?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DXa7FSukIBTlS?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DXbwoaqxaoAVr?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX4E3UdUs7fUx?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1EIeVW7uvMAIlh?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX4SBhb3fqCJd?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX1tyCD9QhIWF?utm_source=generator",
];

// function to get a playlist URL for a recipe
// use the recipe ID to assign the same playlist to the same recipe
export function getPlaylistForRecipe(recipeId) {
  if (!recipeId) {
    return spotifyPlaylists[0];
  }

  // use the last character's char code
  const lastChar = recipeId[recipeId.length - 1];
  const charCode = lastChar.charCodeAt(0);
  const index = charCode % spotifyPlaylists.length;

  return spotifyPlaylists[index];
}
