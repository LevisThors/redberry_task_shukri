import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const Root: React.FC = () => {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;
