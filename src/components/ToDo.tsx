import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";


function ToDo({ text, category, id } : IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        //console.log("i wanna go to ", event.currentTarget.name);
        const {currentTarget:{ name }} = event;
    };
    return (
        <li>
            <span>{text}</span>
            { category !== "DOING" && <button name = "DOING" onClick={onClick}>DOING</button> }
            { category !== "TO_DO" && <button name = "TO_DO" onClick={onClick}>TO DO</button> }
            { category !== "DONE" && <button name = "DONE" onClick={onClick}>DONE</button> }
        </li>
        
    );
}

export default ToDo;