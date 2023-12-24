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
    remove?: (id: string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
    categories,
    toggleActiveFilter,
    activeFilters,
    size,
    remove,
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
                    dragConstraints={
                        remove
                            ? { right: 0, left: -width - 40 }
                            : { right: 0, left: -width }
                    }
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
                                onClick={
                                    toggleActiveFilter
                                        ? (e) => toggleActiveFilter(e)
                                        : (e) => e.preventDefault()
                                }
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
                                {remove && (
                                    <img
                                        src="/assets/icon_white_remove.svg"
                                        alt="remove-category"
                                        onClick={() =>
                                            remove(category.id.toString())
                                        }
                                        width={16}
                                        height={16}
                                    />
                                )}
                            </button>
                        ))
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CategorySlider;
