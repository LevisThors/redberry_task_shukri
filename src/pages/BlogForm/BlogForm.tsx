import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { useValidator } from "../../validations/useValidator";
import "./BlogForm.scss";

const BlogForm: React.FC = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        author: "",
        email: "",
        publish_date: "",
    });
    const validations = useValidator(data);
    console.log(validations);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your logic to handle form submission here
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <section className="blog-form-container">
            <div className="blog-form">
                <h2>Create a new blog post</h2>
                <form onSubmit={handleSubmit}>
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
                    <textarea className="blog-form-textarea"></textarea>
                    <div className="blog-form-row">
                        <Input
                            onChange={handleChange}
                            type="date"
                            label="გამოქვეყნების თარიღი"
                            required={true}
                            value={data.publish_date}
                            name="publish_date"
                        />
                        <select></select>
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
            </div>
        </section>
    );
};

export default BlogForm;
