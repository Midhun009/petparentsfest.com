import React from 'react';
import SliderComponent from '../slider/SliderComponent';
import AboutUs from '../aboutus/AboutUs';
import RegistrationSection from '../registerations/RegistrationSection';
import CardCarousel from '../Card/CardCarousel';
import FeaturesSection from '../features/features';
import Services from '../participate/services';
import Pricing from '../plans/pricing';
import ContactSection from '../contact/contact';
import BenefitsSection from '../befinits/BenefitsSection';
import { Helmet } from 'react-helmet';


// Data for benefits
const benefitsData = {
  title: 'Pet Parents Fest by WonderMom',
  subtitle: 'BENEFITS OF PET PARENTS FEST',
  description: 'Join us for a weekend of fun, learning, and celebration!',
  cards: [
    { icon: '/images/icons/brand.webp', title: 'Brand Exposure', description: 'Gain valuable knowledge from informative talk shows and workshops on parenting and child development.' },
    { icon: '/images/icons/meetup.webp', title: 'Meet New Customers', description: 'Explore exhibitions tailored for UAE parents and expectant parents, featuring the right brands and resources.' },
    { icon: '/images/icons/brandtag.webp', title: 'Make The Brand Tangible', description: 'Connect with other parents, share experiences, and find encouragement in our supportive network.' },
    { icon: '/images/icons/handshake.webp', title: 'Build The Right Relationships', description: 'Complimentary health screenings for your children and family from top professionals.' },
    { icon: '/images/icons/healthcheck.webp', title: 'Health Screenings', description: 'Availing complimentary health screenings from top professionals.' }
  ],
  backgroundImage: '/images/event.webp', // Adjust the path as needed
};

// Data for venue
const venueData = {
  title: 'EVENT DETAILS',
  subtitle: 'Celebrating Pet Parents: A Festival of Love and Companionship',
  description: 'Join us for a weekend of fun, learning, and celebration on January 11th & 12th, 2025!',
  cards: [
    { icon: '/images/icons/date.webp', title: 'Event Date', description: 'January 11th & 12th, 2025!' },
    { icon: '/images/icons/user.webp', title: 'Event Attendees', description: '2500+ attendees from across the UAE' },
    { icon: '/images/icons/venue.webp', title: 'Event Venue', description: 'To be announced soon (Dubai)' }
  ],
  backgroundImage: '/images/event.webp', // Adjust the path as needed
};

const HomePage = () => {
  return (
    <>
    <Helmet>
        <title>Join the Top Pet Parents Fest 2025 | Best for Pet Lovers</title>
        <meta name="description" content="Experience the Pet Parents Fest 2025! Enjoy expert advice, fun activities, and great tips for dog, cat, bird, and reptile lovers of all ages." />
        <meta name="keywords" content="pet industry, pet trends, pet parents, pet spending" />
        <meta name="author" content="Parent Pet Fest" />
      </Helmet>
      <SliderComponent />
      <AboutUs />
      <RegistrationSection />
      <CardCarousel />
      <FeaturesSection
        title="WHO ARE THE ATTENDEES?"
        subtitle="Discover key insights into the pet industry and what pet parents are spending on their furry friends."
        backgroundImage="/images/paw.webp"
      />
      <Services />
      <BenefitsSection {...benefitsData} /> {/* Benefits Section */}
      <Pricing />
      <BenefitsSection {...venueData} /> {/* Venue Section */}
      <ContactSection />
    
    </>
  );
};

export default HomePage;
