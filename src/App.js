import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Button = styled.button`
  color: white;
  background-color: blueviolet;
  border: 0;
  border-radius: 15px;

`;



function App(){
  return (
    <Father>
      <Button>log-in</Button>
      <Button as="a" href="/">log-out</Button>
    </Father>
  );
}

export default App;