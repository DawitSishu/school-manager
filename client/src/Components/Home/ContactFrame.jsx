import React from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./style.css";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
}));

const StyledMapContainer = styled("div")({
  width: "100%",
  maxWidth: "600px",
  height: "400px",
  marginBottom: "16px",
});

const ContactUs = () => {
  return (
    <Grid container spacing={2} sx={{ padding: "20px", margin: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
          Where You Can Find Us
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        zIndex={1}
        justifyContent="center"
        sx={{ height: "52vh", paddingRight: 2 }}
      >
        <Box sx={{ width: "100%", height: "100%" }} className="home-map">
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
      <Grid item xs={12} sm={6} sx={{ padding: 2 }}>
        <Grid container justifyContent="center">
        <Typography variant="h5" align="center" sx={{ marginBottom: "10px" }}>
          Reach Out
        </Typography>
        <Typography variant="body1" align="left" mb={3}>
          Notre Dame School is committed to providing the best education and
          fostering discipline among its students. Our dedicated faculty and
          staff strive to create a nurturing environment where students can
          excel academically and grow personally.
        </Typography>
        <Typography variant="body1" align="left" mb={2}>
          If you have any questions or inquiries, feel free to reach out to us.
          We would love to hear from you!
        </Typography>
        <Button variant="contained">Contact Us</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
