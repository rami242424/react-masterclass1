import styled, {keyframes} from "styled-components";

const rotationAnimation = keyframes`
  0% {
    transform : rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform : rotate(360deg);
    border-radius: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content : center;
  align-items: center;
`;

const Emoji = styled.span`
  font-size: 50px; 
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: blueviolet;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;

  ${Emoji} {
    &:hover {
      font-size: 90px;
    }
  }
`;



function App(){
  return (
    <Wrapper>
      <Box>
        <Emoji>😘</Emoji>
      </Box>
      <Emoji>💥</Emoji>
    </Wrapper>
  );
}

export default App;