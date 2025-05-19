import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  position: absolute;
  top: 100px;
`;

const BoxVar = {
  entry : (isBack:boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center : {
    x: 0,
    opacity: 1,
    scale: 1,
    transition : {
      duration: 0.2,
    },
  },
  exit: (isBack:boolean) => {
    return {
      x: isBack ? 500 : -500,
      opacity: 0,
      rotateX : 180,
      transition : {
        duration: 0.3,
      }
    }
  }
}

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlz = () => {
    setVisible((curr) => (curr === 10 ? 10 : curr + 1));
    setBack(false);
  }
  const prevPlz = () => {
    setVisible((curr) => (curr === 1 ? 1 : curr - 1));
    setBack(true);
  }
  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box 
          custom={back}
          key={visible}
          variants={BoxVar}
          initial="entry"
          animate="center"
          exit="exit"
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlz}>next</button>
      <button onClick={prevPlz}>prev</button>
    </Wrapper>
  );
}

export default App;