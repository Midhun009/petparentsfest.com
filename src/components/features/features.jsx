import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './features.css'; 

const FeaturesSection = ({ title, subtitle, description, backgroundImage }) => {
  const featuresData = [
    {
      icon: '/images/icons/pet-industry.webp', 
      title: 'Key Professionals from Pet Industry',
      description: 'Veterinarians, groomers, trainers, and suppliers who provide essential services and products for pets.',
      isLocal: true,
    },
    {
      icon: '/images/icons/owners.webp',
      title: 'Pet Parents/Owners',
      description: 'Pet parents who consider their pets as family, dedicated to ensuring their well-being and happiness.',
      isLocal: true,
    },
    {
      icon: '/images/icons/aspire.webp',
      title: 'Pet Aspirants',
      description: 'Future pet owners preparing to welcome their first pet, excited to add a new companion to their family.',
      isLocal: true,
    },
    {
      icon: '/images/icons/family.webp',
      title: '6 out of 10 families have minimum 1 pet',
      description: 'Pets are becoming integral members of families, with 60% of households owning at least one pet.',
      isLocal: true,
    },
    {
      icon: '/images/icons/money.webp',
      title: '70% of pet parents spend over 17,500 AED annually on their pets.',
      description: 'Pet owners are willing to invest generously in their pets’ well-being, spending over 17,500 AED annually.',
      isLocal: true,
    },
  ];

  return (
    <section className="homepage">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="text-overlay">
          <h6>{title}</h6>
          <h2>{subtitle}</h2>
          <p className="description">{description}</p>
        </div>
        <div className="cards-container">
          {featuresData.map((feature, index) => (
            <div key={index} className="card">
              {feature.isLocal ? (
                <img src={feature.icon} alt={feature.title} className="card-icon" />
              ) : (
                <FontAwesomeIcon icon={feature.icon} className="card-icon" />
              )}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
