import React, { useState } from "react";
import Input, { Select } from "../../components/Input/Input";
import { useValidator } from "../../validations/useValidator";
import Button from "../../components/Button/Button";
import { BlogFormType } from "../../types/BlogFormType";
import { ValidatorType } from "../../validations/ValidatorType";
import Dropzone from "../../components/Dropzone/Dropzone";
import { useCategories } from "../../hooks/api/useCategories";
import { useEffect } from "react";
import "./BlogForm.scss";

const BlogForm: React.FC = () => {
    const [data, setData] = useState<BlogFormType>({
        title: "",
        description: "",
        author: "",
        email: "",
        publish_date: "",
        image: "",
    });
    const [categoriesToSubmit, setCategoriesToSubmit] = useState<string>("");
    const { categories, loading, error } = useCategories();
    const validations = useValidator(data);
    console.log(validations);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    useEffect(() => {
        document.body.style.backgroundColor = "#FBFAFF";

        return () => {
            document.body.style.backgroundColor = "#F3F2FA";
        };
    }, []);

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
            reader.onload = () => {
                const binaryStr = reader.result;
                setData({ ...data, image: binaryStr });
            };
            reader.readAsBinaryString(file);
        } else {
            setData({ ...data, image: "" });
        }
    };
    console.log(categoriesToSubmit);
    return (
        <section className="blog-form-container">
            <div className="blog-form">
                <h1>ბლოგის დამატება</h1>
                <form onSubmit={handleSubmit}>
                    <Dropzone onFileUpload={handleFileUpload} />
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
                        <Select
                            categories={categories}
                            label="კატეგორია"
                            required={true}
                            setCategories={setCategoriesToSubmit}
                        />
                    </div>
                    <div className="blog-form-row">
                        <Input
                            onChange={handleChange}
                            type="text"
                            label="სათაური"
                            required={true}
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
                            !isFormValid(data, validations, categoriesToSubmit)
                        }
                    />
                </div>
            </div>
        </section>
    );
};

const isFormValid = (
    data: BlogFormType,
    validations: ValidatorType,
    categories: string
) => {
    const allFieldsFilled = Object.values(data).every((field) => field !== "");

    const allValidationsPassed = Object.values(validations).every(
        (validation) => Object.values(validation).every((isValid) => isValid)
    );

    const categoriesPresent = categories !== "";

    return allFieldsFilled && allValidationsPassed && categoriesPresent;
};

export default BlogForm;
