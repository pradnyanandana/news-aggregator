const Category = ({ category }) => {
  return (
    <div className="container">
      <div className="category">
        <h2>{category.title}</h2>
        <div className="first-wrapper">
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
                <h3 className="title">The Latest Cat Trends: Hip or Hype?</h3>
              </div>
            </div>
          </article>
        </div>
        <div className="second-wrapper">
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

export default Category;
