import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const Welcome = () => {
  return (
    <Grid>
      <Grid container justifyContent="center" m={3}>
        <Typography align="center" variant="h4">
          Welcome
        </Typography>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="logo"
        >
          <img
            src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
            alt="logp"
            style={{ width: "40%", height: "80%" }}
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            sx={{
              flexDirection: "column",
              padding: 5,
            }}
            className="about-content-text"
          >
            <Typography variant="h4" className="about-text-title">
              Notre Dame School
            </Typography>
            <Typography variant="body1">
              A school Built to serve the local and international community by
              offering a high quality 21st century learning experience that
              promotes educational achievement and ethical endeavour; providing
              Ethiopia with its next generation of entrepreneurs, inventors,
              creators, physicists, chemists, engineers and scholars.
            </Typography>
            <br />
            <Button variant="contained">Read More</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Welcome;
