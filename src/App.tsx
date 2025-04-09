import {DragDropContext, Droppable, DropResult, } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;



function App(){
  const [toDos, setToDos] = useRecoilState(toDoState);
  // event 또는 arg(상관x)으로 드래그에 대한 상세 정보를 얻을 수 있다!
  // such as destination, source etc...
  // const onDragEnd = (event:any) => {
  //   console.log(event, "dragging fin");
  // };
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if(!destination) return;
    setToDos(oldToDos => {
      const toDosCopy = [...oldToDos];
      // 1) Delete item on source.index (움직인 item 정보) : 원래자리에서 제거
      //console.log("Delete item on", source.index);
      //console.log(toDosCopy);
      toDosCopy.splice(source.index, 1);
      //console.log("Deleted item");
      //console.log(toDosCopy);

      // 2) Put back the item on the destination.index (이동한 위치): 새 위치에 삽입
      //console.log("Put back", draggableId, "on ", destination.index);
      toDosCopy.splice(destination?.index, 0, draggableId);
      //console.log(toDosCopy);
      return toDosCopy;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <DraggableCard key={toDo} index={index} toDo={toDo} />
                  ))}
                  {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;