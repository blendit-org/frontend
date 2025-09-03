import App from "@/App";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Render from "@/pages/Render";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Home,
                path: "/",
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Render,
                path:"render"
            }
        ]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path:"/register"
    },
    {
        Component: Verify,
        path:"/verify"
    }
]);

export default router;