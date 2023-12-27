import React, { ChangeEvent, useState, useEffect } from "react";
import { CategoryType } from "../../types/CategoryType";
import CategorySlider from "../CategorySlider/CategorySlider";
import "./Input.scss";

interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    error?: string;
    validation?: Record<string, boolean>;
    required?: boolean;
    placeholder?: string;
    name: string;
    fail?: boolean;
    success?: boolean;
    isLocalStorage?: boolean;
    cancelValidation?: boolean;
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
    fail,
    success,
    cancelValidation = false,
}) => {
    let savedData = "";

    try {
        savedData = JSON.parse(localStorage.getItem("formData") || "")[name];
    } catch (error) {
        console.log();
    }

    const [touched, setTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    useEffect(() => {
        savedData && setTouched(true);
        savedData.email && setEmailTouched(true);

        success && setTouched(false);
    }, [savedData, success]);

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

            {type === "textarea" ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    className={`input input-textarea ${
                        touched &&
                        validation &&
                        Object.values(validation).some((val) => !val)
                            ? "input-danger"
                            : touched && "input-success"
                    }`}
                    required={required}
                    placeholder={placeholder}
                ></textarea>
            ) : (
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    className={`input ${
                        cancelValidation
                            ? ""
                            : touched &&
                              validation &&
                              Object.values(validation).some((val) => !val)
                            ? "input-danger"
                            : touched && "input-success"
                    } ${fail && touched && "input-danger"}
                    ${name === "email" && value === "" && "input-important"}`}
                    required={required}
                    placeholder={placeholder}
                />
            )}
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
                    } ${
                        Object.keys(validation).length === 1 &&
                        "input-validation-single"
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
                            {name === "email" &&
                            value !== "" &&
                            !validation[key] ? (
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

interface SelectProps {
    label: string;
    required?: boolean;
    categories: CategoryType[];
    setCategories: React.Dispatch<React.SetStateAction<string>>;
    success?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    label,
    required,
    categories,
    setCategories,
    success,
}) => {
    const [selected, setSelected] = useState<CategoryType[]>([]);
    const [newData, setNewData] = useState<CategoryType[]>(categories);
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [touched, setTouched] = useState<boolean>(false);

    const handleRemove = (id: string) => {
        setNewData((prev) => [
            ...prev,
            ...categories.filter((item) => item.id == id),
        ]);
        setSelected(selected.filter((item) => item.id != id));
        setCategories((prev) =>
            prev
                .split(",")
                .filter((item) => item != id)
                .join(",")
        );
    };

    const handleAdd = (id: string) => {
        setSelected((prev) => [
            ...prev,
            ...categories.filter((item) => item.id == id),
        ]);
        setCategories((prev) => (prev ? prev + "," + id : id));
        setNewData((prev) => prev.filter((item) => item.id != id));
    };

    const toggleMasonry = () => {
        setIsSelectOpen((prev) => !prev);
        setTouched(true);
    };

    useEffect(() => {
        setNewData(categories);
        const savedSelected = localStorage.getItem("categoriesToSubmit");
        setSelected(
            categories.filter((cat) =>
                savedSelected?.split(",").includes(cat.id.toString())
            )
        );
        savedSelected && setTouched(true);
    }, [categories, success]);

    return (
        <>
            {isSelectOpen && (
                <span
                    className="input-select-close-overlay"
                    onClick={toggleMasonry}
                ></span>
            )}
            <div className="input-container input-select-container">
                <label className="input-label">
                    {label}
                    {required && "*"}
                </label>
                <span
                    className={`input input-select ${
                        isSelectOpen
                            ? "input-select-focus"
                            : selected.length > 0
                            ? touched && "input-success"
                            : touched && "input-danger"
                    } `}
                >
                    <span
                        className="input-select-toggler"
                        onClick={toggleMasonry}
                    >
                        <img
                            src="/assets/icon_open.svg"
                            alt="Open category masonry"
                            width={20}
                            height={20}
                        />
                    </span>
                    <CategorySlider
                        remove={handleRemove}
                        categories={selected}
                    />
                </span>
                {isSelectOpen && (
                    <span className="input-select-masonry">
                        {newData.map((category) => (
                            <span
                                key={category.id}
                                className="input-select-item"
                                style={{
                                    backgroundColor: category.background_color,
                                    color: category.text_color,
                                }}
                                onClick={() =>
                                    handleAdd(category.id.toString())
                                }
                            >
                                {category.title}
                            </span>
                        ))}
                    </span>
                )}
            </div>
        </>
    );
};

export default Input;
