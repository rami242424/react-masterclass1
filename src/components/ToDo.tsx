import { IToDo } from "../atoms";


function ToDo({ text, category } : IToDo) {
    const onClick = (newCategory: IToDo["category"]) => {
        console.log("i wanna go to new category", newCategory);
    }
    return (
        <li>
            <span>{text}</span>
            { category !== "DOING" && <button onClick={() => onClick("DOING")}>DOING</button> }
            { category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>TO DO</button> }
            { category !== "DONE" && <button onClick={() => onClick("DONE")}>DONE</button> }
        </li>
        
    );
}

export default ToDo;