import { Suspense, useState } from "react";
import { lazy } from "react";
import Button from "../Button/Button";
import "./NavBar.scss";

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
                        width={120}
                        height={20}
                    />
                </div>
                <div className="nav-item-container">
                    <Button
                        text="შესვლა"
                        onClick={toggleLoginModal}
                        width="fit-content"
                    />
                </div>
            </nav>
            {isLoginModalOpen && (
                <Suspense>
                    <LoginModal handleClose={toggleLoginModal} />
                </Suspense>
            )}
        </>
    );
};

export default NavBar;
