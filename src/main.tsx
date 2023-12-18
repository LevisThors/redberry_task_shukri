import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root/Root";
import "./index.scss";

const BlogPage = React.lazy(() => import("./pages/BlogPage/BlogPage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [{ path: "/", element: <BlogPage /> }],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
