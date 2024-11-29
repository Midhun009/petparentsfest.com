import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pricing.css';

const PricingTable = ({ icon, title, price, features }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="single-table">
        <div className="table-head">
          <div className="icon">
            <i className={`icofont ${icon}`}></i>
          </div>
          <h4 className="title">{title}</h4>
          <div className="price">
            <p className="amount">{price}<span></span></p>
          </div>
        </div>
        <div className="scrollable-features">
          <ul className="table-list" style={{ minHeight: '370px' }}>
            {features.map((feature, index) => (
              <li key={index}>
                <i className="icofont-check-circled"></i>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="table-bottom">
          <a className="btn" href="https://wa.me/+971586316069">Enquire Now</a>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://admin.petparentsfest.com/api/packages/')
      .then(response => {
        const fetchedServices = response.data.map(pkg => {
          // Parse HTML to extract features
          const parser = new DOMParser();
          const doc = parser.parseFromString(pkg.features, 'text/html');
          const featureItems = Array.from(doc.querySelectorAll('li, p')).map(el => el.textContent.trim());

          return {
            icon: 'icofont-ui-cut', // Default icon, you can adjust this per service
            title: pkg.name,
            price: `${pkg.amount} AED`,
            features: featureItems, // Use the array of features
          };
        });
        setServices(fetchedServices);
      })
      .catch(error => {
        console.error('Error fetching the packages:', error);
      });
  }, []);

  return (
    <section className="pricing-table section">
      <div className="container">
        <div className="row" style={{ textAlign: 'left', paddingTop: '30px' }}>
          <div className="col-lg-12">
            <div className="pricing-title">
              <h2>PRICING PLANS</h2>
              <h3>Choose from our flexible pricing plans for pet lovers!</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <PricingTable
              key={index}
              icon={service.icon}
              title={service.title}
              price={service.price}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
