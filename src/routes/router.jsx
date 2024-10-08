import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SemiPrivetRoute from "./SemiPrivetRoute";
import SignUp from "../pages/auth/SignUp";
import Document from "../pages/document/Document";
import WordPage from "../pages/document/WordPage";
import Collection from "../pages/document/Collection";
import AddNewWordPage from "../pages/AddNewWordPage";
import Experiment from "../pages/Experiment";
import EditAWordPage from "../pages/EditAWordPage";
import ErrorPage from "../pages/error/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SemiPrivetRoute>
            <Root />
        </SemiPrivetRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "document/:id",
                element: <Document />,
            },
            {
                path: "collection/:id",
                element: <Collection />
            },
            {
                path: "word/:id",
                element: <WordPage />
            },
            {
                path: "add-new-word/:collectionId",
                element: <AddNewWordPage />
            },
            {
                path: "edit-word/:wordId",
                element: <EditAWordPage />
            },
            {
                path: "experiment",
                element: <Experiment />
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