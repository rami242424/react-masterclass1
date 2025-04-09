import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useRef } from "react";
import {useForm} from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";





const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display : flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
    isDraggingFromThis : boolean;
    isDraggingOver: boolean ;
}

const Area = styled.div<IAreaProps>`
    background-color: ${(props)=> props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

const Form = styled.form`
    width: 100%;
    input {
        width : 100%;
    }
`;

interface IBoardProps{
    toDos : ITodo[];
    boardId : string;
}

interface IForm {
    toDo: string;

}
function Board({toDos, boardId}:IBoardProps){
    const setToDos = useSetRecoilState(toDoState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({toDo}:IForm) => {
        // console.log(data, "data");
        const newToDo = {
            id: Date.now(),
            text: toDo,
        }
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [
                    newToDo,
                    ...allBoards[boardId],
                ]
            }
        });
        setValue("toDo", "");
    }

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register( "toDo", {required: true} )} type="text" placeholder={`Add task on ${boardId}`} />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                <Area
                    isDraggingOver={snapshot.isDraggingOver} 
                    isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                    ref={magic.innerRef} 
                    {...magic.droppableProps}
                >
                    {toDos.map((toDo, index) => (
                    <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                    ))}
                    {magic.placeholder}
                </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;