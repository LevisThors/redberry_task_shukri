/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { CategoryType } from "../../types/CategoryType";
import { motion } from "framer-motion";
import "./CategorySlider.scss";
import CategorySliderSkeleton from "./CategorySliderSkeleton/CategorySliderSkeleton";

interface CategorySliderProps {
    categories: CategoryType[];
    toggleActiveFilter?: any;
    activeFilters?: string[];
    size?: "small" | "large";
}

const CategorySlider: React.FC<CategorySliderProps> = ({
    categories,
    toggleActiveFilter,
    activeFilters,
    size,
}) => {
    const [width, setWidth] = useState(0);
    const slider = useRef<any>();

    useEffect(() => {
        setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
    }, [categories]);

    return (
        <section
            className="category-slider-container"
            style={size === "small" ? { justifyContent: "start" } : {}}
        >
            <motion.div
                ref={slider}
                className="category-slider"
                style={size === "small" ? { maxWidth: "100%" } : {}}
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="category-slider-inner"
                    style={size === "small" ? { gap: "16px" } : {}}
                >
                    {!categories ? (
                        <CategorySliderSkeleton />
                    ) : (
                        categories.map((category, index) => (
                            <button
                                key={index}
                                name={category.id.toString()}
                                onClick={(e) => toggleActiveFilter(e)}
                                className={`category-slider-item ${
                                    activeFilters?.includes(
                                        category.id.toString()
                                    ) && "category-slider-item-active"
                                }`}
                                style={{
                                    backgroundColor: category.background_color,
                                    color: category.text_color,
                                    padding:
                                        size === "small"
                                            ? "6px 10px"
                                            : "8px 16px",
                                }}
                            >
                                {category.title}
                            </button>
                        ))
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CategorySlider;
