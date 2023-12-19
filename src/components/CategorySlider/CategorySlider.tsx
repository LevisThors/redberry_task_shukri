import React, { useState } from "react";
import { CategoryType } from "../../types/CategoryType";
import { DraggableCore } from "react-draggable";
import "./CategorySlider.scss";

interface CategorySliderProps {
    categories: CategoryType[];
    toggleActiveFilter: any;
    activeFilters?: string[];
}

const CategorySlider: React.FC<CategorySliderProps> = ({
    categories,
    toggleActiveFilter,
    activeFilters,
}) => {
    const [xPos, setXPos] = useState(0);

    const handleDrag = (e, ui) => {
        const containerWidth =
            document.querySelector(".category-slider")?.clientWidth || 0;
        const contentWidth =
            document.querySelector(".category-slider div")?.scrollWidth || 0;
        const maxDrag = containerWidth - contentWidth;

        if (xPos + ui.deltaX < 0 && xPos + ui.deltaX > maxDrag) {
            setXPos(xPos + ui.deltaX);
        }
    };
    return (
        <section className="category-slider-container">
            <div className="category-slider">
                <DraggableCore onDrag={handleDrag}>
                    <div
                        style={{
                            transform: `translateX(${xPos}px)`,
                            padding: "0 20px",
                        }}
                    >
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "inline-block",
                                    marginRight: "20px",
                                }}
                            >
                                <button
                                    name={category.id.toString()}
                                    onClick={(e) => toggleActiveFilter(e)}
                                    className={`category-slider-item ${
                                        activeFilters?.includes(
                                            category.id.toString()
                                        ) && "category-slider-item-active"
                                    }`}
                                    style={{
                                        backgroundColor:
                                            category.background_color,
                                        color: category.text_color,
                                    }}
                                >
                                    {category.title}
                                </button>
                            </div>
                        ))}
                    </div>
                </DraggableCore>
            </div>
        </section>
    );
};

export default CategorySlider;
