import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./style.css";
const Footer = () => {
  return (
    <div class="footer-distributed">
      <div class="footer-left">
        <h3>
          About<span>ElahwStore</span>
        </h3>

        <p class="footer-links">
          <a href="#">Home</a>|<a href="#">Blog</a>|<a href="#">About</a>|
          <a href="#">Contact</a>
        </p>

        <p class="footer-company-name">© 2020 Elahw Private.</p>
      </div>

      <div class="footer-center">
        <div>
          <i class="fa fa-map-marker"></i>
          <p>
            <span>12 Ton Dan Dist 4</span>
            Ho Chi Minh City
          </p>
        </div>

        <div>
          <i class="fa fa-phone"></i>
          <p>+012 3456789</p>
        </div>
        <div>
          <i class="fa fa-envelope"></i>
          <p>
            <a href="#">support@elahw.com</a>
          </p>
        </div>
      </div>
      <div class="footer-right">
        <p class="footer-company-about">
          <span>About the company</span>
          We offer luxury stuff for your wardrobe.
        </p>
        <div class="footer-icons">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
