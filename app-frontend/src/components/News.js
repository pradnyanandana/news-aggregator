import Slider from "./Slider";
import NewsHomeCategory from "./NewsHomeCategory";

const News = () => {
  return (
    <div className="container">
      <Slider />
      <div className="news-category">
        <NewsHomeCategory category={"sport"} />
        <NewsHomeCategory category={"entertaintment"} />
        <NewsHomeCategory category={"life"} />
        <NewsHomeCategory category={"money"} />
        <NewsHomeCategory category={"tech"} />
        <NewsHomeCategory category={"travel"} />
      </div>
    </div>
  );
};

export default News;
