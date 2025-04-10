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
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  top: 100px;
  position: absolute;
  display: flex;
  justify-content:center;
  align-items:center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const box = {
  // entry: (back:boolean) => ({
  //   x: 500,
  //   opacity: 0,
  //   scale: 0,
  // }),
  entry: (potato:boolean) => {
    return {
      x: potato ? -500 : 500,
      opacity: 0,
      scale: 0,
    }
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration : 1,
    }
  },
  exit: (potato:boolean) => {
    return {
      x: potato ? 500 : -500,
      opacity: 0,
      scale: 0,
      rotateX : 180,
      transition: {
      duration : 1,
    }
    }
  },
}


function App(){
  const [visible, SetVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlz = () => {
    setBack(false);
    SetVisible((prev) => (prev === 10 ? 10 : prev+1))
  }
  const prevPlz = () => {
    setBack(true);
    SetVisible((prev) => (prev === 1 ? 1 : prev-1))
  }
  return (
    <Wrapper>
      <AnimatePresence 
        //exitBeforeEnter 
        custom={back}>
        <Box 
          custom={back}
          variants={box} 
          initial="entry" 
          animate="center"  
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlz}>Next</button>
      <button onClick={prevPlz}>Prev</button>
    </Wrapper>
  );
}

export default App;