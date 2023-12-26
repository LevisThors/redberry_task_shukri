import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { CategoryType } from "../../types/CategoryType";
import { useFilteredBlogs } from "../../hooks/api/useFilteredBlogs";
import Card from "../Card/Card";
import CardSkeleton from "../Card/CardSkeleton/CardSkeleton";
import "./SimilarSlider.scss";

interface SimilarSliderProps {
    categories: CategoryType[];
}

const SimilarSlider: React.FC<SimilarSliderProps> = ({ categories }) => {
    const categoryIds = useMemo(
        () => categories?.map((category) => category.id.toString()),
        [categories]
    );
    const { blogs, loading, error } = useFilteredBlogs(categoryIds);
    const [isAtLeftEnd, setIsAtLeftEnd] = useState(true);
    const [isAtRightEnd, setIsAtRightEnd] = useState(false);
    const sliderRef = useRef(null);
    const x = useMotionValue(0);

    useEffect(() => {
        x.onChange((currentX) => {
            setIsAtLeftEnd(currentX >= 0);
            setIsAtRightEnd(
                currentX <=
                    sliderRef.current.offsetWidth -
                        sliderRef.current.scrollWidth
            );
        });
    }, [x]);

    const handleLeftClick = () => {
        if (!isAtLeftEnd && blogs.length > 3) {
            animate(x, x.get() + 415, {
                type: "spring",
                stiffness: 500,
                damping: 30,
            });
        }
    };

    const handleRightClick = () => {
        if (!isAtRightEnd && blogs.length > 3) {
            animate(x, x.get() - 415, {
                type: "spring",
                stiffness: 500,
                damping: 30,
            });
        }
    };

    return (
        <section>
            <div className="similar-slider-header">
                <h2 className="similar-slider-title">მსგავსი სტატიები</h2>
                <div className="similar-slider-buttons">
                    <img
                        src="/assets/icon_arrow_left.svg"
                        width={44}
                        height={44}
                        onClick={handleLeftClick}
                        className={`similar-slider-buttons-active ${
                            isAtLeftEnd && "similar-slider-buttons-disabled"
                        }`}
                    />
                    <img
                        src="/assets/icon_arrow_right.svg"
                        width={44}
                        height={44}
                        onClick={handleRightClick}
                        className={`similar-slider-buttons-active ${
                            (isAtRightEnd || blogs.length < 4) &&
                            "similar-slider-buttons-disabled"
                        }`}
                    />
                </div>
            </div>
            <div className="similar-slider">
                <motion.div
                    ref={sliderRef}
                    className="similar-slider-inner"
                    style={{ x }}
                >
                    {blogs.length < 1 ? (
                        <p>მსგავსი ბლოგები არ მოიძებნა</p>
                    ) : loading || error ? (
                        [1, 2, 3, 4].map((index) => (
                            <CardSkeleton key={index} />
                        ))
                    ) : (
                        blogs.map((blog, index) => (
                            <Card key={index} content={blog} />
                        ))
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default SimilarSlider;
