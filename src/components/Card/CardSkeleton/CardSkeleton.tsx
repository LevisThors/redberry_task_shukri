import "./CardSkeleton.scss";

const CardSkeleton: React.FC = () => {
    return (
        <div className="card-skeleton">
            <div className="card-skeleton-image" />
            <div className="card-skeleton-ad">
                <span className="card-skeleton-author"></span>
                <span className="card-skeleton-date"></span>
            </div>
            <h2 className="card-skeleton-title"></h2>
            <div className="card-skeleton-categories">
                <div></div>
                <div></div>
            </div>
            <p className="card-skeleton-description"></p>
            <span className="card-skeleton-more"></span>
        </div>
    );
};

export default CardSkeleton;
