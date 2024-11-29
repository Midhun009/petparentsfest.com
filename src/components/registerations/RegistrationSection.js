import React from 'react';
import './RegistrationSection.css'; // Make sure your CSS is imported correctly
import { Link } from 'react-router-dom';

const RegistrationSection = ({ typeregister }) => {
  return (
    <section className="call-action">
      {/* The overlay div that will appear on top of the image */}
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="content">
              <h2>Register Now</h2>
              <p>
        Don’t miss out on the opportunity to be a part of the <b>Pet Parents Fest </b>! Whether you're a pet owner, animal enthusiast, or simply curious about the event, secure your spot by registering today.
      </p>
      <p>
        For any questions or assistance, feel free to reach out to our support team .
      </p>
              <div className="button">
              <Link to="/pet-register" className="btn">Register Now</Link>
                <a href="#contact-us" className="btn second">Contact Us <i className="fa fa-long-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
