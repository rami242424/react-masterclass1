export const API_KEY = "ae39336185873212a3317f6c4e235bbf";
export const BASE_PATH = "https://api.themoviedb.org/3";
// 이미지 주소 https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

interface IResult {
    backdrop_path: string,
    id: number,
    overview: string,
    poster_path: string,
    release_date: number,
    title: string,
} 

export interface IGetMoviesResult {
    dates:{
    maximum: string,
    minimum: string,
    };
    page: number,
    results: IResult[],
    total_pages: number,
    total_results: number,
}

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(response => response.json()
    );
}

export interface ISearchMultiResult {
    backdrop_path: string;
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    media_type: string;
}

export function searchMulti(keyword:string){
    return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}&language=en-US`).then(response => response.json()
    );
}
