import { useState, useEffect } from "react";
import axios from "axios";
import { CategoryType } from "../../types/CategoryType";

export const useCategories = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get(
                    "https://api.blog.redberryinternship.ge/api/categories"
                );
                setCategories(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getCategories();
    }, []);

    return { categories, loading, error };
};
