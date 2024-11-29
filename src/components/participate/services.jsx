import React from 'react';
import './services.css'; // Import your CSS file for styling

const servicesData = [
  { title: "Retailers", description: "(Pet shops, Supermarkets, Convenience stores, Pharmacy, Online store)", icon: '/images/icons/retailers.webp' },
  { title: "Foods", description: "(Pet foods and treats)", icon: '/images/icons/food.webp' },
  { title: "Home", description: "(Living and interior products, pet tableware)", icon: '/images/icons/home.webp' },
  { title: "Toiletry", description: "(Toiletry products)", icon: '/images/icons/soap.webp' },
  { title: "Gifts", description: "(Gifts and novelty goods)", icon: '/images/icons/gift.webp' },
  { title: "Outing", description: "(Outdoor and leisure products and services)", icon: '/images/icons/outing.webp' },
  { title: "Learning", description: "(Pet training products and services)", icon: '/images/icons/learning.webp' },
  { title: "Healthcare & Beauty", description: "(Healthcare & grooming products and services)", icon: '/images/icons/healthcheck.webp' },
  { title: "Veterinary & Nursing care", description: "(Veterinary and nursing care products and services)", icon: '/images/icons/vet.webp' },
  { title: "Ceremonial", description: "(Ceremonial and memorial products and services)", icon: '/images/icons/ceremonial.webp' },
  { title: "Cats", description: "(Products and services for cats)", icon: '/images/icons/cat.webp' },
  { title: "Birds & Small Animals", description: "(Products and services for birds & small animals)", icon: '/images/icons/birds.webp' },
  { title: "Aquarium Life", description: "(Aquarium products and services)", icon: '/images/icons/aquarium.webp' },
  { title: "Education & Information", description: "(Professional schools for pet trainers, publishing, IT)", icon: '/images/icons/book.webp' },
  { title: "Pet Hotels & Restaurants / Cafes", description: "", icon: '/images/icons/hotel.webp' },
  { title: "Manufacturers & Distributors", description: "(Pet food, toys, accessories)", icon: '/images/icons/manufacturers.webp' },
  { title: "Grooming Salons", description: "", icon: '/images/icons/grooming.webp' },
  { title: "Pet Insurance", description: "", icon: '/images/icons/insurance.webp' }
];

const Services = () => {
  return (
    <section className="services section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h6>WHO CAN PARTICIPATE?</h6>
              <h3>Explore our range of veterinary services tailored for pets</h3>
            </div>
          </div>
        </div>
        <div className="row services-row">
          {servicesData.map((service, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={index}>
              <div className="single-service">
                <img src={service.icon} alt={`${service.title} icon`} className="service-icon" />
                <div>
                  <h4><strong>{service.title}</strong></h4>
                  {service.description && <p>{service.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
