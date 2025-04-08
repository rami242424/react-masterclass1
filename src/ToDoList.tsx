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
    const { register, handleSubmit, formState } = useForm();
    const onVaild = (data:any) => {
        // console.log(data);
    };
    console.log(formState.errors);
    return (
        <div>
            <form style={{ display : "flex", flexDirection: "column"}} onSubmit={handleSubmit(onVaild)}>
                <input {...register("Email", {required: true})} placeholder="Email" />
                <input {...register("Firstname", {required: true})} placeholder="Firstname" />
                <input {...register("lastname", {required: true})} placeholder="lastname" />
                <input {...register("username", {required: true, minLength: 5})} placeholder="username" />
                <input {...register("password1", {required: true , minLength: 5})} placeholder="password1" />
                <input {...register("password2", {required: true , minLength: 5})} placeholder="password2" />
                <button>Add</button>
            </form>
        </div>
    );
}
export default ToDoList;