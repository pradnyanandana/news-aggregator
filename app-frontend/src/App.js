import store from "./app/store";
import { Provider } from "react-redux";
import { categories } from "./data/categories";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import News from "./components/News";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Category from "./components/Category";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Search from "./components/Search";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  );
};

const Content = () => {
  const user = useSelector((state) => state.user.value);
  const categoriesFilter = categories.filter(
    (category) =>
      category.slug === "news" ||
      !user ||
      !user.preferences ||
      user.preferences.categories.length === 0 ||
      user.preferences.categories.find((cat) => cat === category.slug)
  );

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header categories={categoriesFilter} />
        <Routes>
          <Route
            path="/"
            element={<News categories={categoriesFilter} />}
          ></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/search" element={<Search />}></Route>
          {categoriesFilter.map((cat, index) => (
            <Route
              key={index}
              path={`/${cat.slug}`}
              element={
                cat.slug === "news" ? (
                  <Navigate to="/" />
                ) : (
                  <Category category={cat} />
                )
              }
            />
          ))}
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
