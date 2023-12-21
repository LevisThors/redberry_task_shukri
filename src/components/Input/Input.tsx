import React, { ChangeEvent, useState } from "react";
import "./Input.scss";

interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    validation?: Record<string, boolean>;
    required?: boolean;
    placeholder?: string;
    name: string;
}

const Input: React.FC<InputProps> = ({
    label,
    type,
    value,
    onChange,
    error,
    validation,
    required,
    placeholder,
    name,
}) => {
    const [touched, setTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const handleFocus = () => {
        if (!touched) {
            setTouched(true);
        }
        if (name === "email" && !emailTouched) {
            setEmailTouched(true);
        }
    };

    return (
        <div className="input-container">
            <label className="input-label">
                {label}
                {required && "*"}
            </label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                className={`input ${
                    validation && Object.values(validation).some((val) => !val)
                        ? "input-danger"
                        : ""
                }`}
                required={required}
                placeholder={placeholder}
            />
            {error && (
                <p className="input-error">
                    <img src="assets/icon_danger.svg" width={20} height={20} />
                    {error}
                </p>
            )}
            {validation && (
                <ul
                    className={`input-validation-container ${
                        name === "email" && "input-validation-email"
                    }`}
                >
                    {Object.keys(validation).map((key) => (
                        <li
                            key={key}
                            className={`input-validation ${
                                touched
                                    ? validation[key]
                                        ? "input-validation-pass"
                                        : "input-validation-fail"
                                    : ""
                            }`}
                        >
                            {name === "email" && emailTouched ? (
                                <>
                                    <img
                                        src="/assets/icon_danger.svg"
                                        width={20}
                                        height={20}
                                    />
                                    {key}
                                </>
                            ) : name === "email" ? (
                                ""
                            ) : (
                                key
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Input;
