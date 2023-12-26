import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BlogType } from "../../types/BlogType";
import CategorySlider from "../CategorySlider/CategorySlider";
import "./Card.scss";

interface CardProps {
    content: BlogType;
}

const Card: React.FC<CardProps> = ({ content }) => {
    const location = useLocation();
    const isBlogPage = location.pathname.startsWith("/blog/");

    return (
        <div className="card">
            <img src={content.image} className="card-image" loading="lazy" />
            <div className="card-ad">
                <span className="card-author">{content.author}</span>
                <span className="card-date">
                    {new Date(content.publish_date)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, ".")}
                </span>
            </div>
            <h2 className="card-title">{content.title}</h2>
            <div>
                <CategorySlider categories={content.categories} size="small" />
            </div>
            <p className="card-description">{content.description}</p>
            <Link
                className="card-more"
                to={`/blog/${content.id}`}
                onClick={
                    isBlogPage
                        ? () => window.scrollTo({ top: 0, behavior: "smooth" })
                        : undefined
                }
            >
                სრულად ნახვა{" "}
                <img src="/assets/icon_more.svg" width={20} height={20} />
            </Link>
        </div>
    );
};

export default Card;
