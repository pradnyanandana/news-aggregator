import { Facebook, Twitter, Dribbble, Linkedin } from "react-feather";

const Footer = () => {
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col">
            <h6>About</h6>
            <p class="text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>

          <div class="col">
            <div>
              <h6>Categories</h6>
              <ul class="footer-links">
                <li>
                  <a href="#">C</a>
                </li>
                <li>
                  <a href="#">
                    UI Design
                  </a>
                </li>
                <li>
                  <a href="#">
                    PHP
                  </a>
                </li>
                <li>
                  <a href="#">
                    Java
                  </a>
                </li>
                <li>
                  <a href="#">Android</a>
                </li>
                <li>
                  <a href="#">
                    Templates
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col">
            <div>
              <h6>Quick Links</h6>
              <ul class="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">
                    Contribute
                  </a>
                </li>
                <li>
                  <a href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            <p class="copyright-text">
              Copyright &copy;2023 All Rights Reserved by{" "}
              <a href="#">Pradnyanandana</a>.
            </p>
          </div>

          <div class="col">
            <ul class="social-icons">
              <li>
                <a class="facebook" href="#">
                  <Facebook size={15} />
                </a>
              </li>
              <li>
                <a class="twitter" href="#">
                  <Twitter size={15} />
                </a>
              </li>
              <li>
                <a class="dribbble" href="#">
                  <Dribbble size={15} />
                </a>
              </li>
              <li>
                <a class="linkedin" href="#">
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
