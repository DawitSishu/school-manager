import React from "react";
import ContactFrame from "./ContactFrame";
import Hero from "./Hero";
import SchoolStats from "./SchoolStats";
import Welcome from "./Welcome";
import Navbar from "./NavBar";
import Footer from "./Footer";

const index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Welcome />
      <SchoolStats />
      <ContactFrame />
      <Footer />
    </div>
  );
};

export default index;
