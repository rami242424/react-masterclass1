import { useQuery } from "react-query";
import { getMovies } from "../api";
import styled from "styled-components";
import { theme } from './../theme';
import makeImgPath from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';

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

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 50px;
  
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

function Home() {
  const {data, isLoading} = useQuery<IDataProps>(["movies", "nowPlaying"], getMovies);
  console.log(data);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if(leaving) return;
    toggleLeaving();
    setIndex((prev) => prev + 1)
  }
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  }
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
                  {[1,2,3,4,5,6].map((v) => <Box key={v}>{v}</Box>)}
                </Row>
              </AnimatePresence>
            </Slider>
          </>
        )
      }
    </Wrapper>
  );
}
export default Home;