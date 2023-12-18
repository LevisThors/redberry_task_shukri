import axios from "axios";
import React, { useState } from "react";

const LoginModal: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleLogin = () => {
        if (!email || email.split("@")[1] !== "redberry.ge") {
            setErrorMessage("მეილი უნდა მთავრდებოდეს @redberry.ge-ით");
            return;
        }

        login(email);
    };

    return (
        <div>
            <h1>შესვლა</h1>
            <label>ელ-ფოსტა</label>
            <input
                type="text"
                value={email}
                onChange={handleChange}
                placeholder="Example@redberry.ge"
            />
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={handleLogin}>შესვლა</button>
        </div>
    );
};

const login = (email: string) => {
    try {
        axios
            .post("https://api.blog.redberryinternship.ge/api/login", { email })
            .then((response) => {
                console.log(response);
            });
    } catch (error) {
        console.log(error);
    }
};

export default LoginModal;
