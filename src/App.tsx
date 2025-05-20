import styled from "styled-components";
import { motion, AnimatePresence, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  flex-direction: colunm;
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
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display:flex;
  justify-content: center;
  align-items: center;
  font-size:25px;
  position: absolute;
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

const boxVar = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible:{
    x: 0,
    opacity: 1,
    scale: 1,
    transition : {
      duration : 1,
    }
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
    transition : {
      duration : 1,
    },
    rotateX: 180,
  }
}


function App() {
  const [visible, setVisible] = useState(1);
  const nextPlz = () => {
    setVisible((prev) => (
      prev === 10 ? 10 : prev+1
    ));
  }
  const prevPlz = () => {
    setVisible((prev) => (
      prev === 1 ? 1 : prev-1
    ));
  }
  return (
    <Wrapper>
      <AnimatePresence> 
        {[1,2,3,4,5,6,7,8,9,10].map((n) => (
          n === visible ? (
            <Box 
              variants={boxVar}
              initial="invisible"
              animate="visible"
              exit="exit"
              key={n}
            >
              {n}
            </Box>
          ) : (
            null
          )
        ))}
      </AnimatePresence>
      <button onClick={nextPlz}>nextPlz</button>
      <button onClick={prevPlz}>prevPlz</button>
    </Wrapper>
  );
}

export default App;