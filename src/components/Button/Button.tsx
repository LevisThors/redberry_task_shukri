import React from "react";
import "./Button.scss";
import { Link } from "react-router-dom";

interface ButtonProps {
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: any;
    disabled?: boolean;
    width?: string;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    disabled,
    width,
    href,
}) => {
    return href ? (
        <Link
            to={href}
            className={`button ${disabled && "button-disabled"}`}
            style={width ? { width: width } : {}}
        >
            {text}
        </Link>
    ) : (
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
