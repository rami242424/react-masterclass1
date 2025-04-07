import { useLocation, useParams } from "react-router-dom";
import { Container, Header, Loader, Title } from "./Coins";
import { useEffect, useState } from "react";

interface RouteParams {
    coinId : string,
}

interface RouteState {
    name: string;
}

interface Itag {
    coin_counter:number,
    ico_counter:number,
    id:string,
    name: string,
}

interface InfoData{
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    logo : string;
    tags : Itag[];
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
}

interface PriceData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD : {
            ath_date: string;
            ath_price : number;
            market_cap : number;
            market_cap_change_24h : number;
            percent_change_1h : number;
            percent_change_1y : number;
            percent_change_6h : number;
            percent_change_7d : number;
            percent_change_12h : number;
            percent_change_15m : number;
            percent_change_24h : number;
            percent_change_30d : number;
            percent_change_30m : number;
            percent_from_price_ath : number;
            price : number;
            volume_24h : number;
            volume_24h_change_24h : number;
        }
    }
}



function Coin(){
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
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
            // console.log(infoData)
            // console.log(priceData)
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading.."}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : priceInfo?.quotes.USD.price
            }
        </Container>
    );
}

export default Coin;