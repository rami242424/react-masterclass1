import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screen/Home";
import About from "./screen/About";
import NotFound from "./screen/NotFound";
import ErrorComponent from "./components/ErrorComponent";
import User from "./screen/users/User";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root />,
        children: [
            {
                path:"",
                element: <Home />,
                errorElement: <ErrorComponent />
            },
            {
                path:"about",
                element: <About />,
            },
            {
                path:"users/:userId",
                element: <User />

            }
        ],
        errorElement: <NotFound/>
        
    }
]);


export default router;