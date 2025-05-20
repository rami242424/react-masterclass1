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
  height: 400px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 1);
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display:flex;
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
  background-color: #00a5ff;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [click, setClick] = useState(false);
  const toggle = () => {
    setClick((prev) => !prev);
  }

  return (
    <Wrapper onClick={toggle}>
      <Box style={{ 
        justifyContent: click ? "center" : "flex-start", alignItems: click ? "center" : "flex-start"
       }}>
        <Circle layout />
      </Box>
    </Wrapper>
  );
}

export default App;