import { useRef, useState, useEffect } from "react";
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
    const categoryIds = categories?.map((category) => category.id.toString());
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
        if (!isAtLeftEnd) {
            animate(x, x.get() + 415, {
                type: "spring",
                stiffness: 500,
                damping: 30,
            });
        }
    };

    const handleRightClick = () => {
        if (!isAtRightEnd) {
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
                        src={
                            isAtLeftEnd
                                ? "/assets/icon_arrow_left.svg"
                                : "/assets/icon_arrow_right.svg"
                        }
                        style={!isAtLeftEnd ? { rotate: "180deg" } : {}}
                        width={44}
                        height={44}
                        onClick={handleLeftClick}
                    />
                    <img
                        src={
                            isAtRightEnd
                                ? "/assets/icon_arrow_left.svg"
                                : "/assets/icon_arrow_right.svg"
                        }
                        style={isAtRightEnd ? { rotate: "180deg" } : {}}
                        width={44}
                        height={44}
                        onClick={handleRightClick}
                    />
                </div>
            </div>
            <div className="similar-slider">
                <motion.div
                    ref={sliderRef}
                    className="similar-slider-inner"
                    style={{ x }}
                >
                    {loading
                        ? [1, 2, 3, 4].map((index) => (
                              <CardSkeleton key={index} />
                          ))
                        : blogs.map((blog) => (
                              <>
                                  <Card content={blog} />
                              </>
                          ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SimilarSlider;
