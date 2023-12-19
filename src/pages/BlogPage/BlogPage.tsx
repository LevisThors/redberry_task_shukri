import React, { MouseEvent, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { CategoryType } from "../../types/CategoryType";
import axios from "axios";

const BlogPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryType[]>([]);

    const toggleActiveFilter = (e) => {
        const { name } = e.target;
        console.log(activeFilter);
        setActiveFilter((prev) => {
            if (prev.length > 0) {
                if (prev.includes(name)) {
                    return prev.filter((filter) => filter !== name);
                } else {
                    return [...prev, name];
                }
            }
            return [""];
        });
    };

    useEffect(() => {
        getCategories(setCategoryData);
    }, []);

    return (
        <section>
            <PageHeader title="ბლოგი" />
            <CategorySlider
                categories={categoryData}
                activeFilters={activeFilter}
                toggleActiveFilter={toggleActiveFilter}
            />
        </section>
    );
};

const getCategories = async (
    setCategoryData: React.Dispatch<React.SetStateAction<CategoryType[]>>
) => {
    try {
        axios
            .get("https://api.blog.redberryinternship.ge/api/categories")
            .then((res) => {
                setCategoryData(res.data.data);
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
    }
};

export default BlogPage;
