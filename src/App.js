import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: yellow;
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
 color : red;
`;

function App(){
  return (
    <Father>
      <BoxOne />
      <Text>hi</Text>
      <BoxTwo />
    </Father>
  );
}

export default App;