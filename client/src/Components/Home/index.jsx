import React from "react";
import ContactFrame from "./ContactFrame";
import Hero from "./Hero";
import SchoolStats from "./SchoolStats";
import Welcome from "./Welcome";
// import Navbar from "./NavBar";

const index = () => {
  return (
    <div>
      <Hero />
      <Welcome />
      <SchoolStats />
      <ContactFrame />
    </div>
  );
};

export default index;
