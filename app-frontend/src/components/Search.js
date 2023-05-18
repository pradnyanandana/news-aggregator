import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { styles } from "../data/styles";
import DatePicker from "react-datepicker";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { saveQuery } from "../app/store";
import "react-datepicker/dist/react-datepicker.css";
import { getNewsSearch } from "../requests";

const Search = ({ categories, sources }) => {
  const animatedComponents = makeAnimated();

  const [loading, setLoading] = useState(true);

  const selectedCategories = useSelector((state) => state.filter.categories);
  const selectedSources = useSelector((state) => state.filter.sources);
  const startDate = useSelector((state) => state.filter.startDate);
  const endDate = useSelector((state) => state.filter.endDate);
  const newsData = useSelector((state) => state.filter.news);
  const search = useSelector((state) => state.filter.search);
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const onDateChange = (dates) => {
    const [start, end] = dates;
    dispatch(saveQuery({ key: "startDate", value: start }));
    dispatch(saveQuery({ key: "endDate", value: end }));
  };

  const changeCategories = (props) => {
    const categories = [...props];
    dispatch(saveQuery({ key: "categories", value: categories }));
    dispatch(
      saveQuery({
        key: "sources",
        value: [...filterSelectedSourced(selectedSources, categories)],
      })
    );
  };

  const changeSources = (props) => {
    dispatch(saveQuery({ key: "sources", value: [...props] }));
  };

  const filterSelectedSourced = (selectedSources, selectedCategories) => {
    return selectedSources.filter((source) => {
      const option = sources.find((src) => src.slug === source.value);
      return (
        selectedCategories.length === 0 ||
        selectedCategories.find((cat) => cat.value === option.category)
      );
    });
  };

  const filterSources = () => {
    return sources.filter(
      (source) =>
        selectedCategories.length === 0 ||
        selectedCategories.find((cat) => cat.value === source.category)
    );
  };

  const loadNews = () => {
    getNewsSearch({
      token,
      search,
      startDate,
      endDate,
      sources: selectedSources.map((s) => s.value),
      categories: selectedCategories.map((c) => c.value),
    })
      .then((response) => {
        if (
          response !== undefined &&
          typeof response.data === "object" &&
          !Array.isArray(response.data) &&
          response.data !== null
        ) {
          dispatch(
            saveQuery({
              key: "news",
              value: response.data.message || [],
            })
          );
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onSubmitFilter = (e) => {
    e.preventDefault();
    setLoading(true);
    loadNews();
  };

  useEffect(() => {
    if (newsData.length === 0) {
      loadNews();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container">
      <div className="search-page">
        <div className="filter">
          <h6>Filter</h6>
          <form onSubmit={onSubmitFilter}>
            <div className="option">
              <div>
                <label>Categories</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  styles={styles}
                  value={selectedCategories}
                  onChange={changeCategories}
                  options={categories
                    .filter((category) => category.slug !== "news")
                    .map((category) => ({
                      value: category.slug,
                      label: category.title,
                    }))}
                />
              </div>
              <div>
                <label>Sources</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  styles={styles}
                  value={selectedSources}
                  onChange={changeSources}
                  options={filterSources().map((source) => ({
                    value: source.slug,
                    label: source.title,
                  }))}
                />
                <p>Sources will depends on the categories</p>
              </div>
              <div>
                <label>Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={onDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                />
              </div>
            </div>
            <div className="action">
              <button type="submit">Apply Filter</button>
            </div>
          </form>
        </div>
        <div className="articles-container">
          {loading ? (
            <Loading />
          ) : (
            newsData.map((data, index) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
