import { useState, useEffect } from "react";
import axios from "axios";
import { DataContext } from "./DataContext";
import { CategoryType } from "../types/CategoryType";
import { BlogType } from "../types/BlogType";

export const DataProvider = ({ children }) => {
    const [categories, setCategories] = useState<CategoryType | null>();
    const [blogs, setBlogs] = useState<BlogType | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reFetch, setReFetch] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get(
                    "https://api.blog.redberryinternship.ge/api/categories"
                );
                setCategories(categoriesResponse.data);

                const blogsResponse = await axios.get(
                    "https://api.blog.redberryinternship.ge/api/blogs",
                    {
                        headers: {
                            Authorization: `Bearer 3a346421bef42b8d9a84587ff8430fc6371b1f9d0932211161fdf1c4d49db3f0`,
                        },
                    }
                );
                setBlogs(blogsResponse.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [reFetch]);

    return (
        <DataContext.Provider
            value={{ categories, blogs, loading, error, setReFetch }}
        >
            {children}
        </DataContext.Provider>
    );
};
