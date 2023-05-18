import store from "./app/store";
import { Provider } from "react-redux";
import { categories } from "./data/categories";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<News />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/search" element={<Search />}></Route>
            {categories.map((cat) => (
              <Route
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
    </Provider>
  );
};

export default App;
