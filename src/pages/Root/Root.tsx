import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./Root.scss";

const Root: React.FC = () => {
    return (
        <>
            <header className="header">
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;
