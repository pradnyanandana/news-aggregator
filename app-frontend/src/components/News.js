import Slider from "./Slider";
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

const NewsHomeCategory = ({ category }) => {
  return (
    <div className="home-category">
      <h2>{category.title}</h2>
      <div className="articles-container">
        <div className="first-article">
          <article>
            <div className="img-container">
              <img src="/sample-image.jpg" alt="Article"></img>
            </div>
            <div className="container">
              <span className="info">
                <p>International New York Times</p>
              </span>
              <span className="info">
                <p>Anna Mercury</p>
                <span></span>
                <p>January 11th 2023</p>
              </span>
              <h3 className="title">The Latest Cat Trends: Hip or Hype?</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </article>
        </div>
        <div className="other-article">
          <article>
            <div className="container">
              <span className="info">
                <p>International New York Times</p>
              </span>
              <span className="info">
                <p>Anna Mercury</p>
                <span></span>
                <p>January 11th 2023</p>
              </span>
              <h5 className="title">The Latest Cat Trends: Hip or Hype?</h5>
            </div>
          </article>
          <article>
            <div className="container">
              <span className="info">
                <p>Anna Mercury</p>
                <span></span>
                <p>January 11th 2023</p>
              </span>
              <h5 className="title">The Latest Cat Trends: Hip or Hype?</h5>
            </div>
          </article>
          <article>
            <div className="container">
              <span className="info">
                <p>Anna Mercury</p>
                <span></span>
                <p>January 11th 2023</p>
              </span>
              <h5 className="title">The Latest Cat Trends: Hip or Hype?</h5>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default News;
