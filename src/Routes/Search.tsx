import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { ISearchMultiResult, searchMulti } from "../api";

function Search(){
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const{ data, isLoading } = useQuery<ISearchMultiResult>(["search", "multi", keyword], () => searchMulti(keyword), {enabled: !!keyword,} );
    //const first: ISearchMultiResult | undefined = data?.results[0];
    return (
        <>  
            { isLoading ? null : keyword && (
                <>
                    <h1>{data?.title}</h1>
                    <span>{data?.overview}</span>
                </>
            )
            }
        </>
    );
}

export default Search;