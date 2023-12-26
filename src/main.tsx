import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root/Root";
import PrivateRoute from "./middlewares/PrivateRoute";
import { DataProvider } from "./providers/DataProvider";
import "./index.scss";

const BlogPage = lazy(() => import("./pages/BlogPage/BlogPage"));
const BlogForm = lazy(() => import("./pages/BlogForm/BlogForm"));
const BlogDetail = lazy(() => import("./pages/BlogDetail/BlogDetail"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense>
                        <BlogPage />
                    </Suspense>
                ),
            },
            {
                path: "/blog/:id",
                element: (
                    <Suspense>
                        <BlogDetail />
                    </Suspense>
                ),
            },
            {
                path: "/blog/create",
                element: (
                    <PrivateRoute>
                        <Suspense>
                            <BlogForm />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider>
    </React.StrictMode>
);
