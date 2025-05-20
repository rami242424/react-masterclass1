import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  background-color:rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 200px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color:rgba(0, 0, 0, 0.5);
`;

// const overlay = {
//   hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
//   visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
//   exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
// };

const Circle = styled(motion.div)`
 background-color: white;
 height: 70px;
 width: 70px;
 place-self: center;
 border-radius: 50px;
`;

const boxVar = {
  start : {
    opacity: 0,
    scale: 0,
  },
  end : {
    opacity: 1,
    scale: 1,
    transition : {
      type: "spring",
      duration : 0.5,
      bounce: 0.5,
      delayChildren : 0.5,
      staggerChildren : 0.2,
    }
  },
}

const circleVar = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  }
}


function App() {
  
  return (
    <Wrapper>di
      <Box variants={boxVar} initial="start" animate="end">
        <Circle variants={circleVar}/>
        <Circle variants={circleVar}/>
        <Circle variants={circleVar}/>
        <Circle variants={circleVar}/>
      </Box>
    </Wrapper>
  );
}

export default App;