import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
    toDo : string;
    index : number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps){
    console.log(toDo, "has been loaded");
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
        {(magic) => (
            <Card 
                ref={magic.innerRef}
                {...magic.draggableProps}
                {...magic.dragHandleProps}
                >
                {toDo}
            </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);