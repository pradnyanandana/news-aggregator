import { categories } from "../data/categories";
import { Facebook, Twitter, Dribbble, Linkedin } from "react-feather";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h6>About</h6>
            <p className="text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>

          <div className="col">
            <div>
              <h6>Categories</h6>
              <ul className="footer-links">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <a href="#">{cat.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col">
            <div>
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Contribute</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="copyright-text">
              Copyright &copy;{new Date().getFullYear()} All Rights Reserved by{" "}
              <a href="#">Pradnyanandana</a>.
            </p>
          </div>

          <div className="col">
            <ul className="social-icons">
              <li>
                <a className="facebook" href="#">
                  <Facebook size={15} />
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <Twitter size={15} />
                </a>
              </li>
              <li>
                <a className="dribbble" href="#">
                  <Dribbble size={15} />
                </a>
              </li>
              <li>
                <a className="linkedin" href="#">
                  <Linkedin size={15} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
