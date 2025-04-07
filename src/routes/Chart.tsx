// import { useParams } from "react-router-dom";

import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
    coinId : string,
}
function Chart({coinId} : ChartProps){
    // 방법1
    // const params = useParams();
    // console.log(params, "파람스");

    // 방법2
    const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return <h1>Chart</h1>
}

export default Chart; 