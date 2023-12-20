import "../CategorySlider.scss";

const CategorySliderSkeleton: React.FC = () => {
    return (
        <section className="category-slider-skeleton-container">
            <div className="category-slider-skeleton">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                    <span
                        key={index}
                        className={`category-slider-skeleton-item`}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default CategorySliderSkeleton;
