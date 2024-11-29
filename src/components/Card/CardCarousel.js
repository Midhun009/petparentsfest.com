import React from 'react';
import Slider from 'react-slick';
import './CardCarousel.css';

const Carousel = () => {
  //  slide
  const slides = [
    { image: '/images/cards/pet.webp', text: 'Pet competitions and talent showcases' },
    { image: '/images/cards/grooming.webp', text: 'Expert demonstrations on pet care,grooming,and training' },
    { image: '/images/cards/Veterinary.webp', text: 'Veterinary seminars and informative sessions on animal health' },
    { image: '/images/cards/products.webp', text: 'Exhibits of the latest pet products and accessories' },
    { image: '/images/cards/animal.webp', text: 'Animal welfare awareness initiatives ' },
    { image: '/images/cards/activities.webp', text: 'Engaging activities for pets and their families' },

  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (

    
    
    <div className="carousel-container">

      <div class="container">
        <div class="row"  style={{ justifyContent : "left", paddingTop:"40px" }}>
        <div class="col-lg-8">
          <div class="section-heading">
          <h6>OUR SEGMENTS </h6>
          <h2>The Event will Feature a Diverse Array
of Segments, including </h2>
          </div>
          </div>
          </div>
          </div>
      <Slider {...settings} className="carousel-slider">
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <div
              className="slide-background"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-number">{index + 1}</div>
              <div className="slide-text">{slide.text}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
