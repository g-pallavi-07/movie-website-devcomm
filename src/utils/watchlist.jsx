

function getWatchlistKey(username) {
  return `cinescope_watchlist_${username}`;
}

export function getWatchlist(username) {
  if (!username) return [];
  const key = getWatchlistKey(username);
  const listJSON = localStorage.getItem(key);
  return listJSON ? JSON.parse(listJSON) : [];
}


export function isInWatchlist(username, imdbID) {
  const list = getWatchlist(username);
  return list.some((movie) => movie.imdbID === imdbID);
}


export function addToWatchlist(username, movie) {
  if (!username) return;

  const list = getWatchlist(username);

  if (list.some((m) => m.imdbID === movie.imdbID)) {
    return;
  }

  const updatedList = [...list, movie];
  localStorage.setItem(getWatchlistKey(username), JSON.stringify(updatedList));
}

export function removeFromWatchlist(username, imdbID) {
  if (!username) return;

  const list = getWatchlist(username);
  const updatedList = list.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem(getWatchlistKey(username), JSON.stringify(updatedList));
}
