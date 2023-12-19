import "./PageHeader.scss";

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    return (
        <section className="page-header">
            <h1>{title}</h1>
            <img src="/assets/Hero.png" height={200} />
        </section>
    );
};

export default PageHeader;
