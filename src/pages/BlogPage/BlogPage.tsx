import React, { useState, useContext } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { useFilteredBlogs } from "../../hooks/api/useFilteredBlogs";
import Card from "../../components/Card/Card";
import CardSkeleton from "../../components/Card/CardSkeleton/CardSkeleton";
import CategorySliderSkeleton from "../../components/CategorySlider/CategorySliderSkeleton/CategorySliderSkeleton";
import { DataContext } from "../../providers/DataContext";
import "./BlogPage.scss";

const BlogPage: React.FC = () => {
    const initialFilter = localStorage.getItem("activeFilter")
        ? JSON.parse(localStorage.getItem("activeFilter")!)
        : [];
    const [activeFilter, setActiveFilter] = useState<string[]>(initialFilter);
    const dataContextValue = useContext(DataContext);

    if (!dataContextValue) {
        throw new Error("useFilteredBlogs must be used within a DataProvider");
    }

    const { categories: categoryData } = dataContextValue;
    const categories = categoryData?.data;

    const { blogs, loading } = useFilteredBlogs(activeFilter);

    const toggleActiveFilter = (e: any) => {
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
                    categories={categories ? categories : []}
                    activeFilters={activeFilter}
                    toggleActiveFilter={toggleActiveFilter}
                />
            )}
            <section className="blog-container">
                <div className="blog">
                    {loading
                        ? [1, 2, 3].map((index) => <CardSkeleton key={index} />)
                        : blogs.map((blog, index) => (
                              <>
                                  <Card content={blog} key={index + blog.id} />
                              </>
                          ))}
                </div>
            </section>
        </section>
    );
};

export default BlogPage;
