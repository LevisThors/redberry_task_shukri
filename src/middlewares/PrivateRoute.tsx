import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
    return localStorage.getItem("isAuthorized") === "true" ? true : false;
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
