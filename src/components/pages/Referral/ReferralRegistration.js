import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../registration.css";
import { Helmet } from "react-helmet";

const ReferralRegistration = () => {
 

  const initialTicketState = {
  
    name: "",
    email: "",
    mobile: "",
    nationality: "",
    have_pets: "",
  };

  const [formData, setFormData] = useState(initialTicketState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/referrals/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit referral");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Referral submitted successfully!", {
          position: "top-right",
        });
        setFormData(initialTicketState); // Reset the form
      })
      .catch((error) => {
        toast.error("Form submission failed. Please try again.", {
          position: "top-right",
        });
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Get Your Free Tickets for the Best Pet Parents Fest 2025</title>
        <meta
          name="description"
          content="Secure your tickets for the Pet Parents Fest 2025! Enjoy live demos, expert tips, and exciting activities for dogs, cats, birds, and more!"
        />
      </Helmet>

      <div
        className="page-background"
        style={{
          backgroundImage: "url(/images/reg.webp)",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <section className="ticket-section">
            <div className="text-left">
              <h6>Pet Parents Expo by wondermom</h6>
              <h2>Join Us for an Unforgettable Experience!</h2>
              <p style={{ marginBottom: "15px", color: "#fff" }}>
                We're excited to invite you to the Pet Parents Expo on{" "}
                <strong>January 11th and 12th, 2024</strong>! This event
                celebrates the joy of pets and brings together a community of
                pet lovers. Secure your spot today and explore exclusive
                opportunities for brands to connect with pet parents.
              </p>
              <p style={{ marginBottom: "15px", color: "#fff" }}>
                For any questions or assistance regarding your tickets, feel
                free to reach out to us at <strong>+971 54 508 3789</strong> or
                click here to{" "}
                <a href="https://wa.me/+971569066391">WhatsApp us</a>.
              </p>
            </div>
            <div className="contact-form ticket-referral-form">
              <form onSubmit={handleSubmit}>
                <h4 className="reg-title">REFERRAL FORM </h4>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name *"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-sm-12">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-sm-12">
                    <input
                      name="mobile"
                      type="text"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-sm-12">
                    <input
                      name="nationality"
                      type="text"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="Nationality *"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-sm-12">
                    <select
                      name="have_pets"
                      value={formData.have_pets}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Do you have pets? *
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {formData.have_pets === "Yes" && (
                    <div className="col-lg-12 col-sm-12">
                      <p>
                        Please register your pets click <a href=" ">here</a>.
                      </p>
                      <br />
                    </div>
                  )}

                  <div className="col-lg-12">
                    <button type="submit" className="main-button">
                      Submit Ticket Referral
                    </button>
                  </div>

                  <ToastContainer
                    closeButton={false}
                    autoClose={3000}
                    position="top-right"
                  />
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReferralRegistration;
