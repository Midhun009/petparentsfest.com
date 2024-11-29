import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCSRFToken } from "../csrf";
const ContactForm = ({ heading, buttonText }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const csrfToken = getCSRFToken();  
    console.log("Form Data:", formData); 
  
    try {
      await axios.post('https://admin.petparentsfest.com/api/contact/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,  // Include the CSRF token here
        },
      });
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error.response ? error.response.data : error);
      toast.error("There was an error sending your message. Please try again.");
    }
  };



  return (
    <div className="contact-us-form">
      <h2>{heading}</h2>
      <p>If you have any questions, please feel free to contact us.</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group login-btn">
              <button className="btn" type="submit">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default ContactForm;
