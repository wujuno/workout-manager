import {createBrowserRouter} from "react-router-dom";
import NotFound from "./components/NotFound";
import Root from "./Root";
import Home from "./screens/Home";
import LogIn from "./screens/Login";
import Record from "./screens/Record";
import SignUp from "./screens/Signup";
import Watch from "./screens/Watch";
import Date from "./screens/Date";
import Test from "./screens/Test";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "record",
                element: <Record/>,
            },
            {
                path: "watch/:username",
                element: <Watch/>,
                
            },
            {
                path: "login",
                element: <LogIn/>
            },
            {
                path: "signup",
                element: <SignUp/>
            },
        ],
        errorElement: <NotFound/>
    }
])

export default router;