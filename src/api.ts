// react-query를 사용하기 위해 반드시 필요한 fetcher함수를 담는 곳

const BASE_URL = `https://api.coinpaprika.com/v1`;

// export async function fetchCoins(){
//     const response = await fetch("https://api.coinpaprika.com/v1/coins");
//     const json = await response.json();
//     return json;
// }

// 위 코드처럼 await, async를 사용하는 대신 아래 코드로..
export function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then(response => response.json());
}


export function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}

export function fetchCoinTickers(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
}

export function fetchCoinHistory(coinId:string){
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - (60*60*24*7);
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response => response.json());
}

// https://ohlcv-api.nomadcoders.workers.dev/?coinId=btc-bitcoin