// react-query를 사용하기 위해 반드시 필요한 fetcher함수를 담는 곳

// export async function fetchCoins(){
//     const response = await fetch("https://api.coinpaprika.com/v1/coins");
//     const json = await response.json();
//     return json;
// }

// 위 코드처럼 await, async를 사용하는 대신 아래 코드로..
export function fetchCoins(){
    return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json());
}