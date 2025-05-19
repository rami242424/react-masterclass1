import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 500vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  
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
  const {scrollY, scrollYProgress} = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {console.log(scrollYProgress.get(), scrollY.get())});
  }, [scrollY, scrollYProgress]);
  
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