import { useState } from "react";
import { lazy } from "react";

const LoginModal = lazy(() => import("../LoginModal/LoginModal"));

const NavBar: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const toggleLoginModal = () =>
        setIsLoginModalOpen((prevState: boolean) => !prevState);

    return (
        <>
            <nav className="nav-container">
                <div className="nav-item-container">
                    <img
                        src="assets/Redberry_logo.png"
                        width={200}
                        height={40}
                    />
                </div>
                <div className="nav-item-container">
                    <span onClick={toggleLoginModal}>შესვლა</span>
                </div>
            </nav>
            {isLoginModalOpen && <LoginModal />}
        </>
    );
};

export default NavBar;
