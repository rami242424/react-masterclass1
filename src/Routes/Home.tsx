import { useQuery } from "react-query";
import { getMovies } from "../api";
import styled from "styled-components";
import { theme } from './../theme';
import makeImgPath from "../utils";

interface IResultsProps {
  backdrop_path:string,
  id: number,
  original_title: string,
  overview: string,
  poster_path:string,
  release_date:string,
  title: string,
}
export interface IDataProps {
  dates:{
    maximum: string, 
    minimum: string
  }
  page: number,
  results: IResultsProps[],
  total_pages: number,
  total_results: number,
}

const Wrapper = styled.div``;
const Loader = styled.div``;
const Banner = styled.div<{bgImg:string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${(props) => props.bgImg});
  background-size: cover;
`;

const Title =styled.h2`
  font-size: 60px;
  margin-bottom: 10px;
`;
const OverView =styled.p`
  font-size: 25px;
`;
function Home() {
  const {data, isLoading} = useQuery<IDataProps>(["movies", "nowPlaying"], getMovies);
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner bgImg={makeImgPath(data?.results[0].poster_path || "")}>
              <Title>{data?.results[0].title}</Title>
              <OverView>{data?.results[0].overview}</OverView>
            </Banner>
          </>
        )
      }
    </Wrapper>
  );
}
export default Home;