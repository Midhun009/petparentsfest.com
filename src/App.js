import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import { BrowserRouter as Router } from 'react-router-dom';
import React from "react";
import { AppRoutes } from "./Routes";
import "./styles/bootstrap.min.css"
import "./styles/flex-slider.css"
import "./styles/font-awesome.css"
import "./styles/lightbox.css"
import "./styles/owl-carousel.css"
import "./styles/select2.min.css"
import "./styles/templatemo-klassy-cafe.css"
import ScrollToTop from './components/ScrollToTop'; 


function App() {
  
  return (
    <div className="App">
      <Router>
      <ScrollToTop />
        <Navbar />
        <AppRoutes /> 
        <Footer />
      </Router>
    </div>
  );
}

export default App;
