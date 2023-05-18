import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useState } from "react";
import { categories, sources } from "../data/categories";
import { styles } from "../data/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Search = () => {
  const animatedComponents = makeAnimated();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const changeCategories = (props) => {
    const categories = [...props];
    setSelectedCategories(categories);
    setSelectedSources([...filterSelectedSourced(selectedSources, categories)]);
  };

  const changeSources = (props) => {
    setSelectedSources([...props]);
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

  const onSubmitFilter = (e) => {
    e.preventDefault();
  }

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
          {[1, 2, 3, 4, 5, 6].map((r) => (
            <article>
              <div>
                <div className="img-container">
                  <img src="/placeholder.png" alt="Article"></img>
                </div>
              </div>
              <div>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
