import React from "react";
import "./footer.scss";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="address">
          <h4>Address</h4>
          <span>Powder Mill Road, Pamplemousses,</span>
          <span>ALC Campus</span>
        </div>
        <div className="phone">
          <h4>Phone Number</h4>
          <span>+230 5841 7209</span>
        </div>
      </div>
      <div className="footer-right">
        <h4>Let's Connect On Our Socials</h4>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="icon" />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/david-gondo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="icon" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
