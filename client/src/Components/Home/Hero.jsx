import React from "react";
import { Grid, Typography } from "@mui/material";
import img from "../../assets/1.jpeg";
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
      minHeight: '80vh', 
      backgroundImage: `url(${img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
      <Typography align="center" variant="h2" color="yellow" className="hero-text">Notre Dame School</Typography>
    </Grid>
  );
};

export default Hero;
