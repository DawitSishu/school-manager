import React, { useEffect } from "react";
import "./style.css";
import image from "../../assets/1.jpeg";
import { Grid, Typography, Box } from "@mui/material";
import ContactForm from "./ContactForm";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar";

const index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <NavBar />
      <Grid
        container
        spacing={0}
        sx={{
          position: "relative",
          maxHeight: "70vh",
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: 5,
        }}
      >
        <div className="contact-overlay"></div>
        <Grid
          item
          justifyContent="center"
          zIndex={1}
          sx={{ marginTop: 7,paddingTop: 5 }}
          xs={12}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "cursive", color: "white" }}
          >
            Come And Visit
          </Typography>
        </Grid>
        <Grid
          zIndex={1}
          container
          justifyContent="center"
          sx={{ marginTop: 7, height: "100vh" }}
        >
          <Box
            sx={{
              width: "80%",
              height: "60%",
            }}
            className="contact-box"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.996912519511!2d41.86047497396099!3d9.595533290490186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x163101c3c526a977%3A0xd1a4de0f7e625c23!2sNotre%20Dame%20School!5e0!3m2!1sen!2set!4v1692875723811!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" zIndex={1} sx={{ marginTop: 40 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ color: "gold", fontWeight: "bold" }}
        >
          Get In Touch
        </Typography>
      </Grid>
      <ContactForm />
      <Footer />
    </div>
  );
};
export default index;
