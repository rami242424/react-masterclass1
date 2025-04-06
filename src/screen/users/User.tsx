import { useParams } from "react-router-dom";
import { users } from "../../db";

function User(){
    // const params = useParams();
    // console.log(params, "파람스");
    const {userId} = useParams();
    return <h1>User with ID {userId} is named: {users[Number(userId)-1].name}</h1>;
}

export default User;