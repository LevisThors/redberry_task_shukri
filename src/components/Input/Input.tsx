import React, { ChangeEvent } from "react";
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
}) => {
    return (
        <div className="input-container">
            <label className="input-label">
                {label}
                {required && "*"}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="input"
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
                <ul className="input-validation-container">
                    {Object.keys(validation).map((key) => (
                        <li
                            key={key}
                            className={`input-validation ${
                                validation[key] ? "pass" : "fail"
                            }`}
                        >
                            {key}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Input;
