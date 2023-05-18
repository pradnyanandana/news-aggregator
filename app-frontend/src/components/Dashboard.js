import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { categories, sources } from "../data/categories";
import { styles } from "../data/styles";
import { checkUser } from "../requests";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePreferences } from "../requests";
import { saveUser, removeNews } from "../app/store";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const user = useSelector((state) => state.user.value);
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const changeCategories = (props) => {
    const categories = [...props];
    setSelectedCategories(categories);
    setSelectedSources([...filterSelectedSourced(selectedSources, categories)]);
  };

  const changeSources = (props) => {
    setSelectedSources([...props]);
  };

  const changeAuthors = (props) => {
    setSelectedAuthors([...props]);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const preferences = {
      categories: selectedCategories.map((cat) => cat.value),
      sources: selectedSources.map((sou) => sou.value),
      authors: selectedAuthors.map((aut) => aut.value),
    };

    setLoading(true);

    updatePreferences({
      token,
      ...preferences,
    })
      .then((response) => {
        if (
          response !== undefined &&
          typeof response.data === "object" &&
          !Array.isArray(response.data) &&
          response.data !== null
        ) {
          console.log(response.data);
          toast.success(response.data.message);
          dispatch(saveUser({ ...user, preferences }));
          dispatch(removeNews(user));
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    checkUser({ token }).catch((error) => {
      navigate("/sign-in");
    });

    if (Array.isArray(user?.preferences?.sources)) {
      setSelectedSources([
        ...sources
          .filter((source) =>
            user?.preferences?.sources.find((s) => s === source.slug)
          )
          .map((source) => ({
            value: source.slug,
            label: source.title,
          })),
      ]);
    }

    if (Array.isArray(user?.preferences?.categories)) {
      setSelectedCategories([
        ...categories
          .filter((category) =>
            user?.preferences?.categories.find((s) => s === category.slug)
          )
          .map((category) => ({
            value: category.slug,
            label: category.title,
          })),
      ]);
    }

    if (Array.isArray(user?.preferences?.authors)) {
      setSelectedAuthors([
        ...user?.preferences?.authors.map((author) => ({
          value: author,
          label: author,
        })),
      ]);
    }
  }, []);

  return (
    <div className="container">
      <div className="dashboard">
        <h5>{`Hello ${user?.name || ""}, Welcome to Your Dashboard!`}</h5>
        <div className="personal-preferences">
          <h6>News Preferences</h6>
          <form onSubmit={handleSubmit}>
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
              <CreatableSelect
                isMulti
                styles={styles}
                onChange={changeAuthors}
              />
              <p>Please type your prefered authors </p>
            </div>
            <div className="action">
              <button type="submit">
                {loading ? <ReactSVG src="svg/loading-circle.svg" /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
