import { useState, useEffect } from "react";
import axios from "axios";
import { BlogType } from "../../types/BlogType";

export const useBlog = (id: string | undefined) => {
    const [blog, setBlog] = useState<BlogType>({} as BlogType);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const getBlogById = async () => {
            try {
                const response = await axios.get(
                    `https://api.blog.redberryinternship.ge/api/blogs/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer 3a346421bef42b8d9a84587ff8430fc6371b1f9d0932211161fdf1c4d49db3f0`,
                        },
                    }
                );
                setBlog(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getBlogById();
    }, []);

    return { blog, loading, error };
};
