const datas = [
  { title: "The Most Cringe-Worthy Fact About Cat" },
  { title: "How to Quit Your Day Job and Focus on Cat" },
  { title: "Feeling Brainy? Test Your Smarts With This Cat Quiz" },
  { title: "The Latest Cat Trends: Hip or Hype?" },
  { title: "Job Hunting in the Cat Industry? Here’s Our Top Tip" },
];

const Slider = () => {
  return (
    <>
      {datas.map((data) => (
        <article key={data.title}>
          <div className="img-container">
            <img src="/sample-image.jpg"></img>
          </div>
          <div className="container">
            <h3 className="title">{data.title}</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </article>
      ))}
    </>
  );
};

export default Slider;
