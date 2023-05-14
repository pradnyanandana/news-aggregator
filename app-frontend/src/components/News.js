import Slider from "./Slider";
import NewsHomeCategory from "./NewsHomeCategory";
import { categories } from "../data/categories";

const News = () => {
  return (
    <div className="container">
      <Slider />
      <div className="news-category">
        {categories
          .filter((cat) => cat.slug !== "news")
          .map((cat, index) => (
            <NewsHomeCategory key={index} category={cat} />
          ))}
      </div>
    </div>
  );
};

export default News;
