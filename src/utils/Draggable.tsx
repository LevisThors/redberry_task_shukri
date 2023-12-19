import { useState, useRef, useEffect, useCallback } from "react";

const Draggable = ({ rootClass = "", children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const ref = useRef(null);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - ref.current.getBoundingClientRect().left);
        setScrollLeft(ref.current.scrollLeft);
    };

    const onMouseEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const onMouseMove = useCallback(
        (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - ref.current.getBoundingClientRect().left;
            const walk = x - startX; // scroll slower
            ref.current.scrollLeft = scrollLeft - walk;
        },
        [isDragging, startX, scrollLeft]
    );

    useEffect(() => {
        console.log(isDragging);
        if (isDragging) {
            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseEnd);
        } else {
            console.log("tes");
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseEnd);
        }
    }, [isDragging, onMouseMove, onMouseEnd]);

    return (
        <div
            className={rootClass}
            ref={ref}
            onMouseDown={onMouseDown}
            style={{
                overflowX: "auto",
                cursor: "grab",
                scrollbarWidth: "none",
            }} // hide scrollbar
        >
            {children}
        </div>
    );
};

export default Draggable;
