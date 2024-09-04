import React from "react";
import Navigation from "./Navigation";
import Header from "./Header";
import Features from "./Features";
import About from "./About";
import Services from "./Services";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import Team from "./Team";
import Contact from "./Contact";

const FullPage = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <Features />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Team />
      <Contact />
    </div>
  );
};

export default FullPage;
