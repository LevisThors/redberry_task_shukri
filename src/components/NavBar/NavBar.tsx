import { Suspense, useState, useEffect } from "react";
import { lazy } from "react";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.scss";

const LoginModal = lazy(() => import("../LoginModal/LoginModal"));

const NavBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const isHome = currentPath === "/";
    const isCreate = currentPath === "/blog/create";

    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(
        localStorage.getItem("isAuthorized") === "true"
    );

    if (!localStorage.getItem("isAuthorized")) {
        localStorage.setItem("isAuthorized", "false");
    }

    const toggleLoginModal = () =>
        setIsLoginModalOpen((prevState: boolean) => !prevState);

    useEffect(() => {
        if (localStorage.getItem("isAuthorized") === "true") {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, [isLoginModalOpen]);

    return (
        <>
            <nav
                className={`nav-container ${
                    isCreate && "nav-container-create"
                }`}
            >
                <div>
                    <Link to={"/"} className="nav-logo">
                        <img
                            src="/assets/Redberry_logo.png"
                            width={150}
                            height={24}
                        />
                    </Link>
                </div>
                {!isCreate && (
                    <div>
                        <Button
                            text={isAuthorized ? "დაამატე ბლოგი" : "შესვლა"}
                            {...(isAuthorized
                                ? { href: "/blog/create" }
                                : { onClick: toggleLoginModal })}
                            width="fit-content"
                        />
                    </div>
                )}
            </nav>
            {!isHome && (
                <img
                    src="/assets/icon_back.svg"
                    width={44}
                    height={44}
                    className={`nav-back ${isCreate && "nav-back-create"}`}
                    onClick={() => navigate(-1)}
                />
            )}
            {isLoginModalOpen && (
                <Suspense>
                    <LoginModal handleClose={toggleLoginModal} />
                </Suspense>
            )}
        </>
    );
};

export default NavBar;
