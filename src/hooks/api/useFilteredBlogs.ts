import { useState, useEffect } from "react";
import axios from "axios";
import { BlogType } from "../../types/BlogType";
import { useParams } from "react-router-dom";

export const useFilteredBlogs = (activeFilters?: string[]) => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const filters = activeFilters ? activeFilters : [];

        const getFilteredBlogs = async () => {
            try {
                const response = await axios.get(
                    "https://api.blog.redberryinternship.ge/api/blogs",
                    {
                        headers: {
                            Authorization: `Bearer 3a346421bef42b8d9a84587ff8430fc6371b1f9d0932211161fdf1c4d49db3f0`,
                        },
                    }
                );
                const blogs = response.data.data;
                const filteredBlogs = blogs.filter((blog: BlogType) => {
                    if (blog.id.toString() === id) {
                        return false;
                    }
                    const publishDate = new Date(blog.publish_date);
                    if (publishDate > new Date()) {
                        return false;
                    }
                    if (filters.length === 0) {
                        return true;
                    }
                    return blog.categories.some((category) =>
                        filters.includes(category.id.toString())
                    );
                });

                setBlogs(filteredBlogs);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getFilteredBlogs();
    }, []);

    return { blogs, loading, error };
};
