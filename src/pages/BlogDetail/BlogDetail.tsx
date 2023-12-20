import { useBlog } from "../../hooks/api/useBlog";
import { useParams } from "react-router-dom";
import SimilarSlider from "../../components/SimilarSlider/SimilarSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import "./BlogDetail.scss";

const BlogDetail: React.FC = () => {
    const { id } = useParams<string>();
    const { blog, loading, error } = useBlog(id);

    console.log(blog);
    if (loading) return <div>Loading...</div>;
    return (
        <main>
            <section className="blog-details-container">
                <div className="blog-details">
                    <div className="blog-details-image-container">
                        <img src={blog.image} alt={blog.title} />
                    </div>
                    <div className="blog-details-header">
                        <span className="blog-details-author">
                            {blog.author}
                        </span>
                        <div className="blog-details-date">
                            <span>
                                {new Date(blog.publish_date)
                                    .toLocaleDateString("en-GB")
                                    .replace(/\//g, ".")}
                            </span>
                            <span>{blog.email}</span>
                        </div>
                        <h1>{blog.title}</h1>
                        <CategorySlider
                            categories={blog.categories}
                            size="small"
                        />
                    </div>
                    <p className="blog-details-description">
                        {blog.description}
                    </p>
                </div>
            </section>
            <SimilarSlider categories={blog.categories} />
        </main>
    );
};

export default BlogDetail;
