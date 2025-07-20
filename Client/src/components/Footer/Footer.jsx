import React from 'react';
import './Footer.css';
// import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">

        {/* 1st Column - Logo + About + Social Links */}
        <div className="footer-col">
          <h2 className="footer-logo">ProjectHub</h2>
          <p className="footer-desc">
            Empowering teams to manage projects, track tasks, and collaborate seamlessly.
          </p>
          {/* <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div> */}
        </div>

        {/* 2nd Column - Policies */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Refund Policy</li>
            <li>About Us</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* 3rd Column - Contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Email: support@projecthub.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Address: 2nd Floor, Tech Park, Bangalore</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ProjectHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
