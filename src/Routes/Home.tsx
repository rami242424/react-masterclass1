import { useQuery } from "react-query";
import { getMovies } from "../api";
import styled from "styled-components";
import { theme } from './../theme';
import makeImgPath from "../utils";
import { AnimatePresence, motion, useTransform, useViewportScroll } from "framer-motion";
import { useState } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";

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

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgImg: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImg});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 10px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{bgImg:string}>`
  background-color: white;
  height: 350px;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  &:first-child{
    transform-origin: center left;
  }
  &:last-child{
    transform-origin: center right;
  }
  padding-bottom: 200px;
  cursor: pointer;
`;


const rowVar = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x:0,
  },
  exit:{
    x: -window.outerWidth - 10
  },
}

const offset = 6;

const boxVar = {
  normal: {
    scale: 1,
  },
  hover : {
    scale:1.1,
    y:-50,
    transition:{
      type:"tween",
      delay: 0.2,
      duaration: 0.3,
    }
  },
}

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity:0;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigMovieCover = styled.div`
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center center;
`;
const BigMovieTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
`;

function Home() {
  const {data, isLoading} = useQuery<IDataProps>(["movies", "nowPlaying"], getMovies);
  //console.log(data);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if(data){
      if(leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => prev === maxIndex ? 0 : prev + 1)
    }
  }
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  }

  const history = useHistory();
  const boxClicked = (movieId:number) => {
    //console.log(movieId, "movie id");
    history.push(`/movies/${movieId}`);
  }
  
  const bigMovieMatch = useRouteMatch<{movieId:string}>("/movies/:movieId");
  //console.log(bigMovieMatch);

  const overylayClicked = () => {
    history.push("/");
  }

  const {scrollY} = useViewportScroll();
  // 방법2
  const setScrollY = useTransform(scrollY, (value) => value + 50);


  const clickedMovie = bigMovieMatch && data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId);
  //console.log(clickedMovie);

  return (
    <Wrapper>
      {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner onClick={increaseIndex} bgImg={makeImgPath(data?.results[0].poster_path || "")}>
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row 
                  key={index} 
                  variants={rowVar} 
                  initial="hidden" 
                  animate="visible" 
                  exit="exit"
                  transition={{ type: "tween" }}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset*index, offset*index+offset)
                    .map((movie) => (
                      <Box 
                        layoutId={movie.id+""} 
                        onClick={() => boxClicked(movie.id)}
                        key={movie.id} 
                        bgImg={makeImgPath(movie.poster_path, "w500")}
                        whileHover="hover"
                        initial="normal"
                        variants={boxVar}
                      >
                        <Info variants={infoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
            <AnimatePresence>
              { bigMovieMatch ? (
                <>
                  <Overlay 
                    onClick={overylayClicked}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                  />
                  <BigMovie
                    layoutId={bigMovieMatch.params.movieId}
                    style={{
                      // 방법1
                      //top: scrollY.get() + 100, 
                      // 방법2
                      top: setScrollY,
                    }}
                  >
                    {clickedMovie && (
                        <>
                          <BigMovieCover
                            style={{ backgroundImage: `url(${makeImgPath(clickedMovie.backdrop_path, "w400")})`}}
                          />
                          <BigMovieTitle>{clickedMovie.title}</BigMovieTitle>
                        </>
                      )
                    }
                  </BigMovie>
                </>
                ) : (
                  null
                )
              }
            </AnimatePresence>
          </>
        )
      }
    </Wrapper>
  );
}
export default Home;