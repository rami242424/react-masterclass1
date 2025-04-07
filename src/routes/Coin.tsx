import { useParams } from "react-router-dom";

interface RouteParams {
    coinId : string,
}
function Coin(){
    const {coinId} = useParams<RouteParams>();
    
    return <h1>Coin : coinId is {coinId} </h1>
}

export default Coin;