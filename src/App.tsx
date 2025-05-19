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
  invisible : {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible : {
    x: 0,
    opacity: 1,
    scale: 1,
    transition : {
      duration: 1,
    },
  },
  exit: {
    x: -500,
    opacity: 0,
    // scale: 0,
    rotateX : 180,
    transition : {
      duration: 1,
    }
  },
}

function App() {
  const [visible, setVisible] = useState(1);
  const nextPlz = () => {
    setVisible((curr) => (curr === 10 ? 10 : curr + 1))
  }
  const prevPlz = () => {
    setVisible((curr) => (curr === 1 ? 1 : curr - 1))
  }
  return (
    <Wrapper>
      <AnimatePresence>
        {[1,2,3,4,5,6,7,8,9,10].map((n) => (
            n === visible ? (
              <Box 
                key={n}
                variants={BoxVar}
                initial="invisible"
                animate="visible"
                exit="exit"
              >
                {n}
              </Box>
            ) : (
              null
            )
          ))}
      </AnimatePresence>
      <button onClick={nextPlz}>next</button>
      <button onClick={prevPlz}>prev</button>
    </Wrapper>
  );
}

export default App;