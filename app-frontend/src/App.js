import "./App.css";
import "./components/Header";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "./components/News";

const App = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<News />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
