import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Home/Navbar";
import HOME from "./Component/Home/HOME.JSX";
import Footer from "./Component/Home/Footer/Footer";

// Aap additional pages bana sakte ho, jaise About.jsx, Contact.jsx
import HeroSection from "./Component/Home/Hero";
import AboutPage from "./Component/About/AboutPage";
import ServicePage from "./Component/Services/ServicePage";
import ContactPage from "./Component/Contact/ContactPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HOME />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Future me yaha aur routes add kar sakte ho */}
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage/>} />
        {/* Default route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
