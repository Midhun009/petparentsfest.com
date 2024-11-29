import React from 'react';
import './BenefitsSection.css'; 

const BenefitsSection = ({ title, subtitle, description, cards, backgroundImage }) => {
  return (
    <section className="homepage">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="text-overlay">
          <h6>{title}</h6>
          <h2>{subtitle}</h2>
          <p className="description">{description}</p>
        </div>
        <div className="cards-container">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <img src={card.icon} alt={card.title} className="card-icon" />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
