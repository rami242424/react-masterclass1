const API_KEY ="ae39336185873212a3317f6c4e235bbf";
const BASE_PATH="https://api.themoviedb.org/3";

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
}

