import { useBlog } from "../../hooks/api/useBlog";
import { useParams } from "react-router-dom";
import SimilarSlider from "../../components/SimilarSlider/SimilarSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import "./BlogDetail.scss";

const BlogDetail: React.FC = () => {
    const { id } = useParams<string>();

    const { blog, loading } = useBlog(id);

    if (loading) return <div>Loading...</div>;
    return (
        <section className="blog-details-page-wrapper">
            <div className="blog-details-page">
                <div className="blog-details-container">
                    <div className="blog-details">
                        <div className="blog-details-image-container">
                            <img src={blog.image} alt={blog.title} />
                        </div>
                        <div className="blog-details-header">
                            <div className="blog-details-header-top">
                                <span className="blog-details-header-author">
                                    {blog.author}
                                </span>
                                <div className="blog-details-header-date">
                                    <span>
                                        {new Date(blog.publish_date)
                                            .toLocaleDateString("en-GB")
                                            .replace(/\//g, ".")}
                                    </span>
                                    <span>{" • " + blog.email}</span>
                                </div>
                            </div>
                            <h1>{blog.title}</h1>
                            <CategorySlider
                                categories={blog.categories}
                                size="small"
                            />
                        </div>
                        {blog.description.split("\n").map(
                            (paragraph, index) =>
                                paragraph.trim() !== "" && (
                                    <p
                                        className="blog-details-description"
                                        key={index}
                                    >
                                        {paragraph}
                                    </p>
                                )
                        )}
                    </div>
                </div>
                <SimilarSlider categories={blog.categories} />
            </div>
        </section>
    );
};

export default BlogDetail;
