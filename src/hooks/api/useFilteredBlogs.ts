import { useContext } from "react";
import { BlogType } from "../../types/BlogType";
import { useParams } from "react-router-dom";
import { DataContext } from "../../providers/DataContext";

export const useFilteredBlogs = (activeFilters?: string[]) => {
    const { id } = useParams<{ id: string }>();

    const filters = activeFilters ? activeFilters : [];
    const { blogs, loading, error } = useContext(DataContext);
    let filteredBlogs: BlogType[] = [];

    if (!loading) {
        filteredBlogs = blogs.data.filter((blog: BlogType) => {
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
    }

    return { blogs: filteredBlogs, loading, error };
};
