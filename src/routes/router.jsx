import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SemiPrivetRoute from "./SemiPrivetRoute";
import SignUp from "../pages/auth/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SemiPrivetRoute>
            <Root />
        </SemiPrivetRoute>,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    }
]) 