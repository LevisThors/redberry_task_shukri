import React, { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { useCategories } from "../../hooks/api/useCategories";
import { useFilteredBlogs } from "../../hooks/api/useFilteredBlogs";
import Card from "../../components/Card/Card";
import CardSkeleton from "../../components/Card/CardSkeleton/CardSkeleton";
import CategorySliderSkeleton from "../../components/CategorySlider/CategorySliderSkeleton/CategorySliderSkeleton";

import "./BlogPage.scss";

const BlogPage: React.FC = () => {
    const initialFilter = localStorage.getItem("activeFilter")
        ? JSON.parse(localStorage.getItem("activeFilter")!)
        : [];
    const [activeFilter, setActiveFilter] = useState<string[]>(initialFilter);

    const { categories, loading, error } = useCategories();
    const {
        blogs,
        loading: blogLoading,
        error: blogError,
    } = useFilteredBlogs(activeFilter);

    console.log("hello");

    const toggleActiveFilter = (e) => {
        const { name } = e.target;

        setActiveFilter((prev) => {
            let newFilter;
            if (prev.length > 0) {
                if (prev.includes(name)) {
                    newFilter = prev.filter((filter) => filter !== name);
                } else {
                    newFilter = [...prev, name];
                }
            } else {
                newFilter = [name];
            }
            localStorage.setItem("activeFilter", JSON.stringify(newFilter));
            return newFilter;
        });
    };

    return (
        <section>
            <PageHeader title="ბლოგი" />
            {loading ? (
                <CategorySliderSkeleton />
            ) : (
                <CategorySlider
                    categories={categories}
                    activeFilters={activeFilter}
                    toggleActiveFilter={toggleActiveFilter}
                />
            )}
            <section className="blog-container">
                <div className="blog">
                    {blogLoading
                        ? [1, 2, 3].map((index) => <CardSkeleton key={index} />)
                        : blogs.map((blog, index) => (
                              <>
                                  <Card content={blog} key={index} />
                              </>
                          ))}
                </div>
            </section>
        </section>
    );
};

export default BlogPage;
