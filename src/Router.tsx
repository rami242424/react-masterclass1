import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screen/Home";
import About from "./screen/About";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root />,
        children: [
            {
                path:"",
                element: <Home />
            },
            {
                path:"about",
                element: <About />
            }
        ]
        
    }
]);


export default router;