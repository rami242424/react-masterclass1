import { useRecoilValue } from 'recoil';
import { toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';



function ToDoList(){
    const toDos = useRecoilValue(toDoState);
    console.log(toDos, "투두스");

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <CreateToDo />
            <ul>
                {toDos.map((toDo) => <ToDo key={toDo.id} {...toDo}></ToDo>)}
            </ul>
        </div>
    );
}


export default ToDoList;