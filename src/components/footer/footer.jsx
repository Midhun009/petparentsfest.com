import React from 'react';
import './footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-xs-12">
            <div className="left-text-content">
              <ul className="social-icons">
                <li>
                  <a href="https://www.facebook.com/petparentsexpo/">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/thewondermoms">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="http://linkedin.com/company/thewondermomclub">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/petparentsexpo/">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-xs-4">
  <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
    <a href="https://thewondermom.club/" target="_blank" rel="noopener noreferrer">
      <img src="https://thewondermom.club/static/assets/images/logo.png" alt="The WonderMoM Fest" width="80px" />
    </a>
    <a href="/" rel="noopener noreferrer">
      <img src="/images/logo.webp" alt="petexpor Logo" width="100px" style={{ marginLeft: '20px' }} />
    </a>
  </div>



          </div>
          <div className="col-lg-4 col-xs-4">
            <div className="right-text-content">
              <p style={{textTransform: 'capitalize'}}>© 2024 Gulf Time Media LLC. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
