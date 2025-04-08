import { useForm } from "react-hook-form";


/* function ToDoList(){
    const [toDo, setTodo] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {currentTarget : { value },
        } = event;
        setTodo(value);
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(toDo);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder="Write a to do" />
                <button>Add</button>
            </form>
        </div>
    );
}
 */

function ToDoList(){
    const { register, watch } = useForm();
    // console.log(register("todo"));
    console.log(watch());
    
    return (
        <div>
            <form>
                <input {...register("Email")} placeholder="Email" />
                <input {...register("Firstname")} placeholder="Firstname" />
                <input {...register("lastname")} placeholder="lastname" />
                <input {...register("username")} placeholder="username" />
                <input {...register("password1")} placeholder="password1" />
                <input {...register("password2")} placeholder="password2" />
                <button>Add</button>
            </form>
        </div>
    );
}
export default ToDoList;