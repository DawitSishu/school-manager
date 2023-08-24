import React from "react";
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
    </div>
  );
};

export default index;
