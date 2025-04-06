import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screen/Home";
import About from "./screen/About";
import NotFound from "./screen/NotFound";
import ErrorComponent from "./components/ErrorComponent";

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
                element: <About />
            }
        ],
        errorElement: <NotFound/>
        
    }
]);


export default router;