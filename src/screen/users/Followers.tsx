import { useOutletContext } from "react-router-dom";

interface IFollowersContext {
    nameOfMyUser: string
}
function Followers(){
    // const ctx = useOutletContext();
    // console.log(ctx, "씨티엑스");
    const { nameOfMyUser } = useOutletContext<IFollowersContext>();
    return <h1>here are {nameOfMyUser} 의 followers</h1>;
}

export default Followers;