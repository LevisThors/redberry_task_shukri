import axios from "axios";
import React, { MouseEventHandler, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./LoginModal.scss";

interface LoginModalProps {
    handleClose: MouseEventHandler;
}

const LoginModal: React.FC<LoginModalProps> = ({ handleClose }) => {
    const [email, setEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEmail(event.target.value);
    };

    const handleLogin = () => {
        if (!email || email.split("@")[1] !== "redberry.ge") {
            setErrorMessage("მეილი უნდა მთავრდებოდეს @redberry.ge-ით");
            return;
        }

        login(email, setErrorMessage, setShowSuccessModal);
    };

    return (
        <>
            <div className="login-overlay" onClick={handleClose}></div>
            <div className="login-container">
                {!showSuccessModal ? (
                    <>
                        <div>
                            <img
                                onClick={handleClose}
                                className="login-close"
                                src="/assets/icon_close.svg"
                                width={24}
                                height={24}
                            />
                        </div>
                        <h1 className="login-title">შესვლა</h1>
                        <Input
                            name="email"
                            type="email"
                            label="ელ-ფოსტა"
                            value={email}
                            onChange={handleChange}
                            error={errorMessage}
                            placeholder="Example@redberry.ge"
                        />
                        <Button
                            text="შესვლა"
                            onClick={handleLogin}
                            disabled={email ? false : true}
                        />
                    </>
                ) : (
                    <SuccessModal
                        handleClose={handleClose}
                        successText="წარმატებული ავტორიზაცია"
                    />
                )}
            </div>
        </>
    );
};

export const SuccessModal = ({
    handleClose,
    successText,
    errorText,
    backText,
    href,
    success,
}: {
    handleClose: MouseEventHandler;
    successText: string;
    errorText?: string;
    backText?: string;
    href?: string;
    success?: boolean;
}) => {
    return (
        <>
            <div>
                <img
                    onClick={handleClose}
                    className="login-close"
                    src="/assets/icon_close.svg"
                    width={24}
                    height={24}
                />
            </div>
            <div className="login-success">
                {success ? (
                    <img
                        src="/assets/icon_success.svg"
                        width={64}
                        height={64}
                    />
                ) : (
                    <img
                        src="/assets/icon_white_x.svg"
                        width={64}
                        height={64}
                        className="login-error-icon"
                    />
                )}
                <h1 className="login-title">
                    {success ? successText : errorText}
                </h1>
            </div>
            <div className="login-return-button-container">
                <Button
                    text={backText ? backText : "კარგი"}
                    onClick={handleClose}
                    href={href ? href : undefined}
                />
            </div>
        </>
    );
};

const login = (
    email: string,
    errorSetter: React.Dispatch<React.SetStateAction<string>>,
    onSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        axios
            .post("https://api.blog.redberryinternship.ge/api/login", { email })
            .then(() => {
                onSuccess(true);
                localStorage.setItem("isAuthorized", "true");
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message === "The selected email is invalid."
        ) {
            errorSetter("ელ-ფოსტა არ მოიძებნა");
        } else {
            errorSetter("სცადეთ მოგვიანებით");
        }
        localStorage.setItem("isAuthorized", "false");
    }
};

export default LoginModal;
