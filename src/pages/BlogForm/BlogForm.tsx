import React, { useState, useEffect, useContext } from "react";
import Input, { Select } from "../../components/Input/Input";
import { useValidator } from "../../validations/useValidator";
import Button from "../../components/Button/Button";
import { BlogFormType } from "../../types/BlogFormType";
import { ValidatorType } from "../../validations/ValidatorType";
import Dropzone from "../../components/Dropzone/Dropzone";
import { blobToFile } from "../../utils/blobToFile";
import { DataContext } from "../../providers/DataContext";
import { SuccessModal } from "../../components/LoginModal/LoginModal";
import axios from "axios";
import "./BlogForm.scss";

const emptyForm = {
    title: "",
    description: "",
    author: "",
    email: "",
    publish_date: "",
    image: "",
    imageName: "",
};

const BlogForm: React.FC = () => {
    const initialData = JSON.parse(
        localStorage.getItem("formData") || JSON.stringify(emptyForm)
    );
    const initialCategories = localStorage.getItem("categoriesToSubmit") || "";

    const throwError =
        Object.values(initialData).some((value) => value !== "") ||
        initialCategories !== "";

    const [data, setData] = useState<BlogFormType>(initialData);
    const [categoriesToSubmit, setCategoriesToSubmit] =
        useState<string>(initialCategories);
    const {
        categories: categoryData,
        loading,
        setReFetch,
    } = useContext(DataContext);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const categories = categoryData?.data;
    const validations = useValidator(data);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileUpload = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData({
                    ...data,
                    image: reader.result as string,
                    imageName: file.name,
                });
            };
            reader.readAsDataURL(file);
        } else {
            setData({ ...data, image: "", imageName: "" });
        }
    };

    const handleClose = () => {
        setIsSubmitted(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isFormValid(data, validations, categoriesToSubmit)) {
            const submitImage = blobToFile(data.image, data.imageName);

            const formData = new FormData();
            for (const key in data) {
                if (key !== "image" && key !== "imageName")
                    formData.append(key, data[key]);
            }
            formData.append("categories", "[" + categoriesToSubmit + "]");
            formData.append("image", submitImage as File);

            try {
                await axios.post(
                    `https://api.blog.redberryinternship.ge/api/blogs`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer 3a346421bef42b8d9a84587ff8430fc6371b1f9d0932211161fdf1c4d49db3f0`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                setSuccess(true);
                setIsSubmitted(true);
                setReFetch(true);
                setData(emptyForm);
                setCategoriesToSubmit("");
                clearLocalStorage();
            } catch (error) {
                setIsSubmitted(true);
                setSuccess(false);
            }
        }
    };

    useEffect(() => {
        setLocalStorage(data, validations, categoriesToSubmit);
    }, [data, validations, categoriesToSubmit]);

    useEffect(() => {
        document.body.style.backgroundColor = "#FBFAFF";

        return () => {
            document.body.style.backgroundColor = "#F3F2FA";
        };
    }, []);

    return (
        <>
            <section className="blog-form-container">
                <div className="blog-form">
                    <h1>ბლოგის დამატება</h1>
                    <form onSubmit={handleSubmit}>
                        <Dropzone
                            onFileUpload={handleFileUpload}
                            throwError={throwError}
                            success={success}
                        />
                        <div className="blog-form-row">
                            <Input
                                onChange={handleChange}
                                type="text"
                                label="ავტორი"
                                required={true}
                                placeholder="შეიყვანეთ ავტორი"
                                validation={validations.author}
                                value={data.author}
                                name="author"
                            />
                            <Input
                                onChange={handleChange}
                                type="text"
                                label="სათაური"
                                required={true}
                                placeholder="შეიყვანეთ სათაური"
                                validation={validations.title}
                                value={data.title}
                                name="title"
                            />
                        </div>
                        <Input
                            onChange={handleChange}
                            type="textarea"
                            label="აღწერა"
                            required={true}
                            placeholder="შეიყვანეთ აღწერა"
                            validation={validations.description}
                            value={data.description}
                            name="description"
                        />
                        <div className="blog-form-row">
                            <Input
                                onChange={handleChange}
                                type="date"
                                label="გამოქვეყნების თარიღი"
                                required={true}
                                value={data.publish_date}
                                name="publish_date"
                                fail={data.publish_date === ""}
                            />
                            {!loading && (
                                <Select
                                    categories={categories}
                                    label="კატეგორია"
                                    required={true}
                                    setCategories={setCategoriesToSubmit}
                                    success={success}
                                />
                            )}
                        </div>
                        <div className="blog-form-row">
                            <Input
                                onChange={handleChange}
                                type="text"
                                label="ელ-ფოსტა"
                                placeholder="Example@redberry.ge"
                                validation={validations.email}
                                value={data.email}
                                name="email"
                            />
                        </div>
                    </form>
                    <div className="blog-form-button">
                        <Button
                            text="გამოქვეყნება"
                            width="288px"
                            onClick={handleSubmit}
                            disabled={
                                !isFormValid(
                                    data,
                                    validations,
                                    categoriesToSubmit
                                )
                            }
                        />
                    </div>
                </div>
            </section>
            {isSubmitted && (
                <>
                    <div className="login-overlay" onClick={handleClose}></div>
                    <div className="login-container">
                        <SuccessModal
                            handleClose={handleClose}
                            successText="ჩანაწერი წარმატებით დაემატა"
                            errorText="ფოტოს ზომა აჭარბებს ლიმიტს"
                            backText="მთავარ გვერდზე დაბრუნება"
                            success={success}
                            href="/"
                        />
                    </div>
                </>
            )}
        </>
    );
};

const isFormValid = (
    data: BlogFormType,
    validations: ValidatorType,
    categories: string
) => {
    const allFieldsFilled = Object.entries(data).every(
        ([key, value]) => key === "email" || value !== ""
    );
    const allValidationsPassed = Object.values(validations).every(
        (validation) => Object.values(validation).every((isValid) => isValid)
    );

    const categoriesPresent = categories !== "";

    return allFieldsFilled && allValidationsPassed && categoriesPresent;
};

const setLocalStorage = (
    data: BlogFormType,
    validations: ValidatorType,
    categories: string
) => {
    localStorage.setItem("formData", JSON.stringify(data));
    localStorage.setItem("formValidations", JSON.stringify(validations));
    localStorage.setItem("categoriesToSubmit", categories);
};

const clearLocalStorage = () => {
    localStorage.setItem("formData", JSON.stringify(emptyForm));
    localStorage.removeItem("formValidations");
    localStorage.removeItem("categoriesToSubmit");
};

export default BlogForm;
