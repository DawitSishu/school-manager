import React from "react";
import { Grid, Typography } from "@mui/material";
// import img from "../../assets/1.jpeg";
import img from "../../assets/nds1.webp";
import "./style.css";

const Hero = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "80vh",
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="home2-overlay"></div>
      <Typography
        align="center"
        variant="h2"
        color="white"
        className="hero-text"
      >
        Notre Dame School
      </Typography>
      <Typography
        align="center"
        variant="h3"
        color="white"
        className="hero-text"
      >
        Knowledge is Power
      </Typography>
    </Grid>
  );
};

export default Hero;
