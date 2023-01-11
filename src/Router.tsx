import {createBrowserRouter} from "react-router-dom";
import NotFound from "./components/NotFound";
import Root from "./Root";
import Home from "./screens/Home";
import LogIn from "./screens/Login";
import Record from "./screens/Record";
import SignUp from "./screens/Signup";
import Watch from "./screens/watch/Watch";
import Date from "./screens/watch/Date";
import Test from "./screens/Test";
import SeeOneRecord from "./screens/watch/SeeOneRecord";

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
                children: [
                    {
                        path:"sdate",
                        element: <Date/>,
                        children: [
                            {
                                path:":date",
                                element: <SeeOneRecord/>
                            }
                        ]
                    }
                ]
                
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