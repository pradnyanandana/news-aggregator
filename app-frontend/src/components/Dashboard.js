import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import { categories, sources } from "../data/categories";
import { styles } from "../data/styles";
import { checkUser } from "../requests";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

  const { setToken, token } = useToken();

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

  useEffect(() => {
    checkUser({ token }).catch((error) => {
      navigate("/sign-in");
    });
  }, []);

  return (
    <div className="container">
      <div className="dashboard">
        <h5>Hello John Doe, Welcome to Your Dashboard!</h5>
        <div className="personal-preferences">
          <h6>News Preferences</h6>
          <form>
            <div className="option">
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
              <label>Authors</label>
              <CreatableSelect isMulti styles={styles} />
              <p>Please type your prefered authors </p>
            </div>
            <div className="action">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
