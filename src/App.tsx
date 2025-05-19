import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient(135deg, rgb(238,0,153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const bgGradient = useTransform(x, [-800, 800], [
    'linear-gradient(135deg, rgb(141, 46, 243), rgb(24, 216, 226) )',
   
    'linear-gradient(135deg, rgb(82, 232, 23), rgb(232, 235, 42) )',
  ]);
  // const xScale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  // useEffect(() => {
  //   //x.onChange(() => console.log(x.get()));
  //   xScale.onChange(() => console.log(xScale.get()));
  // }, [x])
  return (
    <Wrapper style={{ background: bgGradient}}>
      <Box
        // style={{ x, scale: xScale }}
        style={{ x, rotateZ }}
        drag="x"
      />
    </Wrapper>
  );
}

export default App;