import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import makeImgPath from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{bgImg:string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8)), url(${(props) => props.bgImg});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

function Home() {
  const{ data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  return (
    <Wrapper>
      {isLoading? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner bgImg={makeImgPath(data?.results[0].backdrop_path || "")}>
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
          </>)
          
      }
    </Wrapper>)
  ;
}
export default Home;