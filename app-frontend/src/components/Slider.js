import { useState } from "react";
import { ReactSVG } from "react-svg";

const datas = [
  { title: "The Most Cringe-Worthy Fact About Cat", active: true },
  { title: "How to Quit Your Day Job and Focus on Cat" },
  { title: "Feeling Brainy? Test Your Smarts With This Cat Quiz" },
  { title: "The Latest Cat Trends: Hip or Hype?" },
  { title: "Job Hunting in the Cat Industry? Here's Our Top Tip" },
];

const Slider = () => {
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
            <img src="/sample-image.jpg" alt="Article"></img>
            <button>Sport</button>
          </div>
          <div className="container">
            <span className="info">
              <p>Anna Mercury</p>
              <span></span>
              <p>January 11th 2023</p>
            </span>
            <h3 className="title">{data.title}</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
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

export default Slider;
