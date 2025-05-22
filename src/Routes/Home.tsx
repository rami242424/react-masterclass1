import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import makeImgPath from "../utils";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

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

const Slider = styled.div`
  position:relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position:absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{bgImg:string}>`
  background-color: white;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: white;
  &:first-child {
    transform-origin: center left;
  };
  &:last-child {
    transform-origin: center right;
  };
  cursor: pointer;
`;

const rowVar = {
  hidden : {
    x: window.outerWidth - 5 ,
  },
  visible : {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 5 ,
  },
}

const offset = 6;

const boxVar = {
  normal: {
    scale : 1,
    transition: {
      type: "tween",
    }
  },
  hover: {
    scale : 1.1,
    y: -40,
    transition: {
      delay: 0.1,
      type: "tween",
    }
  },
}

const PopupInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width:100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const PopupInfoVar = {
  hover:{
    opacity: 1,
  },
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;

`;

const BigPopup = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left:0;
  right: 0;
  margin: 0 auto;

`;


function Home() {
  const{ data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incIndex = () => {
    if(data) {
      if(leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (
        prev === maxIndex ? 0 : prev+1
      ));
    }
  }
  const toggleLeaving = () => {setLeaving((prev) => !prev)}
  const history = useHistory();
  const onBoxClick = (movieId:number) => {
    history.push(`/movies/${movieId}`);
  }
  const movieMatch = useRouteMatch<{movieId: string}>("/movies/:movieId");
  const overlayClick = () => {
    history.goBack();
  }
  const {scrollY} = useViewportScroll();
  return (
    <Wrapper>
      {isLoading? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner onClick={incIndex} bgImg={makeImgPath(data?.results[0].backdrop_path || "")}>
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row 
                  variants={rowVar} 
                  initial="hidden" 
                  animate="visible" 
                  exit="exit" 
                  key={index}
                  transition={{ type: "tween", duration: 2}}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id+""}
                        key={movie.id}
                        variants={boxVar}
                        initial="normal"
                        whileHover="hover"
                        bgImg={makeImgPath(movie.backdrop_path, "w500")}
                        onClick={() => onBoxClick(movie.id)}
                      >
                        <PopupInfo 
                          variants={PopupInfoVar}
                        >
                          <h4>{movie.title}</h4>
                        </PopupInfo>
                      </Box>
                    ))
                  }
                </Row>
              </AnimatePresence>
            </Slider>
            <AnimatePresence>
              { movieMatch ? (
                <>
                  <Overlay onClick={overlayClick} animate={{opacity: 1}} exit={{opacity: 0}}/>
                  <BigPopup 
                    layoutId={movieMatch.params.movieId}
                    style={{ top: scrollY.get() + 50}}
                  />
                </>
                ) : (
                  null
                )}
            </AnimatePresence>
          </>)
          
      }
    </Wrapper>)
  ;
}
export default Home;