import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="socials">
        <h3>
          Unwind in timeless elegance at My Hotel, where impeccable service
          meets unforgettable experiences.
        </h3>
        <ul>
          <li>
            <a href="#">
              <FaFacebook color="#514594" size="1.5em" />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTwitter color="#514594" size="1.5em" />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram color="#514594" size="1.5em" />
            </a>
          </li>
          <li>
            <a href="#">
              <FaYoutube color="#514594" size="1.5em" />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
