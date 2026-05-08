import { createBrowserRouter } from "react-router-dom"; // createBrowserRouter is used to create a router instance for our application
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])