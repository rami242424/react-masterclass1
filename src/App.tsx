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
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
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

const BoxVar = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1, 
    rotateZ: 360,
    transition: { 
      type: "spring", 
      delay: 0.5 
    }
  }
}

function App() {
  
  return (
    <Wrapper>
      <Box
        variants={BoxVar}
        initial="start"
        animate="end"
      />
    </Wrapper>
  );
}

export default App;