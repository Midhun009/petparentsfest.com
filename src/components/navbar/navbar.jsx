import React from 'react';
import { Link } from 'react-router-dom'; 
import './navbar.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Navbar = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="floating-navbar">
      <ul className="navbar-list">
        <li>
          <Link
            to="/"
            className="home-icon"
            title="Home"
            onClick={handleScrollToTop}
          >
            <i className="fas fa-home"></i>
          </Link>
        </li>
        <li>
          <a
            href="https://wa.me/+971569066391"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-icon"
            title="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/petparentsfest/#"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-icon"
            title="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/petparentsexpo/"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook-icon"
            title="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a
            href="http://linkedin.com/company/thewondermomclub"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-icon"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
