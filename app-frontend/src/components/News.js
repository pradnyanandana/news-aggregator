import { useSelector, useDispatch } from "react-redux";
import { saveNews } from "../app/store";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { getNews } from "../requests";

const News = ({ categories }) => {
  const token = useSelector((state) => state.token.value);
  const newsData = useSelector((state) => state.news.news);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newsData.length === 0) {
      getNews({ token })
        .then((response) => {
          if (
            response !== undefined &&
            typeof response.data === "object" &&
            !Array.isArray(response.data) &&
            response.data !== null
          ) {
            dispatch(
              saveNews({
                category: "news",
                news: response.data.message || [],
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="container">
      <NewsSlider news={newsData} />
      <div className="news-category">
        {categories
          .filter((cat) => cat.slug !== "news")
          .map((cat, index) => (
            <NewsHomeCategory key={index} category={cat} news={newsData} />
          ))}
      </div>
    </div>
  );
};

const NewsSlider = ({ news }) => {
  const datas = news.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(datas.length - 1);
    }
  };

  const handleClickRight = () => {
    setActiveIndex((activeIndex + 1) % datas.length);
  };

  const handleClickBullet = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="slider">
      {datas.map((data, index) => (
        <article key={index} className={index === activeIndex ? "active" : ""}>
          <div className="img-container">
            <img src={data.image || "/placeholder.png"} alt="Article"></img>
            <button>{data.category}</button>
          </div>
          <div className="container">
            <span className="info">
              <p>{data.source}</p>
            </span>
            <span className="info">
              <p>{data.author}</p>
              <span></span>
              <p>{new Date(data.published_at).toDateString()}</p>
            </span>
            <a href={data.url} target="_blank">
              <h3 className="title">{data.title}</h3>
            </a>
            <p>{data.excerpt}</p>
          </div>
        </article>
      ))}
      <div className="navigation">
        <div className="bullets">
          {datas.map((data, index) => (
            <span
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => handleClickBullet(index)}
            ></span>
          ))}
        </div>
        <div className="arrows">
          <ReactSVG src="svg/arrow-left.svg" onClick={handleClickLeft} />
          <ReactSVG src="svg/arrow-right.svg" onClick={handleClickRight} />
        </div>
      </div>
    </div>
  );
};

const NewsHomeCategory = ({ category, news }) => {
  const datas = news.filter((n) => n.category === category.slug).slice(0, 4);

  return (
    <div className="home-category">
      <h2>{category.title}</h2>
      {datas.length > 0 ? (
        <div className="articles-container">
          <div className="first-article">
            <article>
              <div className="img-container">
                <img
                  src={datas[0].image || "/placeholder.png"}
                  alt="Article"
                ></img>
              </div>
              <div className="container">
                <span className="info">
                  <p>{datas[0].source}</p>
                </span>
                <span className="info">
                  <p>{datas[0].author}</p>
                  <span></span>
                  <p>{new Date(datas[0].published_at).toDateString()}</p>
                </span>
                <a href={datas[0].url} target="_blank">
                  <h3 className="title">{datas[0].title}</h3>
                </a>
                <p>{datas[0].excerpt}</p>
              </div>
            </article>
          </div>
          <div className="other-article">
            {datas.slice(1, 4).map((data, index) => (
              <article key={index}>
                <div className="container">
                  <span className="info">
                    <p>{data.source}</p>
                  </span>
                  <span className="info">
                    <p>{data.author}</p>
                    <span></span>
                    <p>{new Date(data.published_at).toDateString()}</p>
                  </span>
                  <a href={data.url} target="_blank">
                    <h5 className="title">{data.title}</h5>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <p>No Content</p>
      )}
    </div>
  );
};

export default News;
