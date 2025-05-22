import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import makeImgPath from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
  color: red;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
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
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  }
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
                        key={movie.id}
                        variants={boxVar}
                        initial="normal"
                        whileHover="hover"
                        bgImg={makeImgPath(movie.backdrop_path, "w500")}
                      >
                        {movie.title}
                      </Box>
                    ))
                  }
                </Row>
              </AnimatePresence>
            </Slider>
          </>)
          
      }
    </Wrapper>)
  ;
}
export default Home;