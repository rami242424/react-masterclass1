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
  gap: 10px;
  position:absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
`;

const rowVar = {
  hidden : {
    x: window.outerWidth - 10,
  },
  visible : {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 10,
  },
}


function Home() {
  const{ data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incIndex = () => {
    if(leaving) return;
    toggleLeaving();
    setIndex((prev) => prev+1);
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
                  transition={{ type: "tween", duration: 5}}
                >
                  {[1,2,3,4,5,6].map((n) => <Box key={n}>{n}</Box>)}
                </Row>
              </AnimatePresence>
            </Slider>
          </>)
          
      }
    </Wrapper>)
  ;
}
export default Home;