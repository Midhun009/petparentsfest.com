import React from 'react';
import './AboutUs.css'
const AboutUs = () => {
  return (
    <section className="section" id="about" style={{padding: "10px 0px 0px"}}>
      <div className="container">
        <div className="row">
          {/* WONDERMOM BUMP TO BABY Section */}
          <div className="col-lg-6 col-md-6 col-xs-12">
            <div className="left-text-content">
              <div className="section-heading">
                <h6>ABOUT US</h6>
                <h2 style={{marginBottom:'0px'}}>PET PARENTS FEST BY WONDERMOM</h2>
              </div>
              <p>
              <p>
        Welcome to the <strong>Pet Parents Fest</strong>, the ultimate celebration of the love and joy pets bring into our lives!
        Organized by WonderMom, this event is designed to bring pet owners, animal enthusiasts, and families together 
        in a fun, educational, and heartwarming environment.
      </p>
      <p>
        Taking place on <strong>January 11th and 12th, 2025</strong>, the <strong>Pet Parents Fest</strong> offers a two-day experience filled with exciting activities, live demonstrations,
        and interactive events for pet lovers of all ages. Whether you're looking to learn more about pet care, explore the latest trends 
        in pet health, training, and fashion, or simply enjoy a day of pet-related fun, this event has something for everyone.
      </p>
      </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-xs-12">
            <div className="right-content">
              <div className="thumb">
                <img src="/images/main.webp" alt="The WonderMoM Fest" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
