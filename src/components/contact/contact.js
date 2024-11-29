import React from "react";
import "./contact.css";
import ContactForm from "./ContactForm"; 

const ContactSection = () => {
  return (
    <section className="contact-us section" style={{ padding: "30px 20px" }} id="contact-us">
      <div className="container">
        <div className="inner">
          <div className="row">
          <div className="col-lg-6">
  <div className="contact-us-left">
    <iframe
      title="Gulf Time Media LLC Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.756287272252!2d55.349264574474596!3d25.27878257765847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6f9fc566a887%3A0x4951f9856aa1f6c5!2sGULF%20TIME%20MEDIA%20LLC!5e0!3m2!1sen!2sin!4v1726846849533!5m2!1sen!2sin"
      width="100%"
      height="600"
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
</div>

            <div className="col-lg-6">
              {/* Use the ContactForm component here for contact form */}
              <ContactForm
                heading="Contact With Us"
                buttonText="Send"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
