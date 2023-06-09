import { useSelector, useDispatch } from "react-redux";
import { getNewsCategory } from "../requests";
import { saveNews } from "../app/store";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Category = ({ category }) => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token.value);
  const newsData = useSelector((state) => state.news[category.slug]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newsData.length === 0) {
      getNewsCategory({ token, category: category.slug })
        .then((response) => {
          if (
            response !== undefined &&
            typeof response.data === "object" &&
            !Array.isArray(response.data) &&
            response.data !== null
          ) {
            dispatch(
              saveNews({
                category: category.slug,
                news: response.data.message || [],
              })
            );
          }

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [category]);

  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <div className="category">
        <h2>{category.title}</h2>
        {newsData.length > 0 ? (
          <>
            <div className="first-wrapper">
              <article>
                <div>
                  <div className="img-container">
                    <img
                      src={newsData[0].image || "/placeholder.png"}
                      alt="Article"
                    ></img>
                  </div>
                </div>
                <div>
                  <div className="container">
                    <span className="info">
                      <p>{newsData[0].source}</p>
                    </span>
                    <span className="info">
                      <p>{newsData[0].author}</p>
                      <span></span>
                      <p>{new Date(newsData[0].published_at).toDateString()}</p>
                    </span>
                    <a href={newsData[0].url} target="_blank">
                      <h3 className="title">{newsData[0].title}</h3>
                    </a>
                  </div>
                </div>
              </article>
            </div>
            <div className="second-wrapper">
              {newsData.slice(1, 16).map((data, index) => (
                <article key={index}>
                  <div>
                    <div className="img-container">
                      <img
                        src={data.image || "/placeholder.png"}
                        alt="Article"
                      ></img>
                    </div>
                  </div>
                  <div>
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
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p>No Content</p>
        )}
      </div>
    </div>
  );
};

export default Category;
