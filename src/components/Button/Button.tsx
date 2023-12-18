import React from "react";
import "./Button.scss";

interface ButtonProps {
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: any;
    disabled?: boolean;
    width?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, width }) => {
    return (
        <button
            onClick={onClick}
            className={`button ${disabled && "button-disabled"}`}
            disabled={disabled}
            style={width ? { width: width } : {}}
        >
            {text}
        </button>
    );
};

export default Button;
