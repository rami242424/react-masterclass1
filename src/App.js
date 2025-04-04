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
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: blueviolet;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;

  span {
    font-size: 50px; 
    &:hover {
      font-size: 80px;
    }
    &:active {
      opacity: 0;
    }
  }
  /* span:hover{
  } */
`;



function App(){
  return (
    <Wrapper>
      <Box>
        <span>😘</span>
      </Box>
    </Wrapper>
  );
}

export default App;