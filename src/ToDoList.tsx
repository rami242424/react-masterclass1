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
interface IForm {
    email : string,
    firstname : string,
    lastname : string,
    username : string,
    password1 : string,
    password2 : string,
}

function ToDoList(){
    const { register, handleSubmit, formState:{errors} } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });
    const onVaild = (data:any) => {
        // console.log(data);
    };
    // console.log(errors);
    return (
        <div>
            <form style={{ display : "flex", flexDirection: "column"}} onSubmit={handleSubmit(onVaild)}>
                <input {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        message: "Only naver.com is vaild!",
                    }
                    })} placeholder="Email"
                />
                <span>
                    {errors?.email?.message}
                </span>
                <input {...register("firstname", {required: "write first name here"})} placeholder="Firstname" />
                <span>
                    {errors?.firstname?.message}
                </span>
                <input {...register("lastname", {required: "write last name here"})} placeholder="lastname" />
                <span>
                    {errors?.lastname?.message}
                </span>
                <input {...register("username", {required: "write user name here", minLength: 5})} placeholder="username" />
                <span>
                    {errors?.username?.message}
                </span>
                <input {...register("password1", {required: "write your password1" , minLength: 5})} placeholder="password1" />
                <span>
                    {errors?.password1?.message}
                </span>
                <input {...register("password2", {
                    required: "Password is required",
                    minLength: {
                        value: 5,
                        message: "Your password is too short.",
                    }
                    })} placeholder="password2" />
                <span>
                    {errors?.password2?.message}
                </span>
                <button>Add</button>
            </form>
        </div>
    );
}
export default ToDoList;