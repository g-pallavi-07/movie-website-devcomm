


const API_KEY = "5eb0e614";
const BASE_URL = "https://www.omdbapi.com/";


export const TRENDING_TITLES = [
  "Dune: Part Two",
  "Oppenheimer",
  "Inside Out 2",
  "Deadpool & Wolverine",
  "The Batman",
  "Barbie",
  "Everything Everywhere All at Once",
];


export const POPULAR_TITLES = [
  "The Dark Knight",
  "Inception",
  "Interstellar",
  "The Shawshank Redemption",
  "Pulp Fiction",
  "The Matrix",
  "Fight Club",
  "Forrest Gump",
];


export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
  );
  const data = await response.json();

  
  if (data.Response === "False") {
    return [];
  }

  return data.Search;
}


export async function getMovieByTitle(title) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`
  );
  const data = await response.json();

  if (data.Response === "False") {
    return null;
  }

  return data;
}


export async function getMovieById(imdbID) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );
  const data = await response.json();

  if (data.Response === "False") {
    return null;
  }

  return data;
}


export async function getMoviesByTitles(titles) {
  const promises = titles.map((title) => getMovieByTitle(title));
  const results = await Promise.all(promises);
  return results.filter((movie) => movie !== null);
}
