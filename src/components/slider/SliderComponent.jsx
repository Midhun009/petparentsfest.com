import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import './slider.css'; 

const SliderComponent = () => {
  const [banners, setBanners] = useState([]);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleNext = () => sliderRef.current.slickNext();
  const handlePrev = () => sliderRef.current.slickPrev();

  useEffect(() => {
    fetch('https://admin.petparentsfest.com/api/banners/') // Replace with your API URL
      .then((response) => response.json())
      .then((data) => setBanners(data))
      .catch((error) => console.error('Error fetching slider data:', error));
  }, []);


  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
      {banners.map((banner) => (
        <div>
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
            <img src={banner.image} alt="Test" />
            </a>
        </div>
        ))}
       
        
        
      </Slider>
      <button className="prev-button" onClick={handlePrev} aria-label="Previous slide"></button>
      <button className="next-button" onClick={handleNext} aria-label="Next slide"></button>
    </div>
  );
};

export default SliderComponent;
