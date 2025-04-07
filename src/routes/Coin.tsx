import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Loader, Title } from "./Coins";
import { useEffect, useState } from "react";

interface RouteParams {
    coinId : string,
}

interface RouteState {
    name: string;
}
function Coin(){
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();

            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading.."}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : null
            }
        </Container>
    );
}

export default Coin;