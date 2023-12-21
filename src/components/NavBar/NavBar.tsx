import { Suspense, useState, useEffect } from "react";
import { lazy } from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const LoginModal = lazy(() => import("../LoginModal/LoginModal"));

const NavBar: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(
        localStorage.getItem("isAuthorized") === "true"
    );

    const toggleLoginModal = () =>
        setIsLoginModalOpen((prevState: boolean) => !prevState);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthorized(localStorage.getItem("isAuthorized") === "true");
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <>
            <nav className="nav-container">
                <div>
                    <Link to={"/"} className="nav-logo">
                        <img
                            src="/assets/Redberry_logo.png"
                            width={150}
                            height={24}
                        />
                    </Link>
                </div>
                <div>
                    <Button
                        text={isAuthorized ? "დაამატე ბლოგი" : "შესვლა"}
                        {...(isAuthorized
                            ? { href: "/blog/create" }
                            : { onClick: toggleLoginModal })}
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
