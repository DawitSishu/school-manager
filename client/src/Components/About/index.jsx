import React, { useEffect, useState } from "react";
import image from "../../assets/1.jpeg";
import { Grid, Typography } from "@mui/material";
import { DefaultPlayer as Video } from "react-html5video";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import "react-html5video/dist/styles.css";
import vid from "../../assets/ff.mp4";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar";
import "./style.css";

const index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };
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
          sx={{ marginTop: 7,padding: 5 }}
          xs={12}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ fontFamily: "cursive", color: "white" }}
          >
           About US
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
          <Typography variant="h3" align="center" className="about-text-title">
          Message From our Director
          </Typography>
        </Grid>
        {!isOpen ? (
          <div className="play-image">
            <img src={image} alt="Play Video" />
            <div className="play-button-overlay" onClick={handleOpenPopup}>
              <PlayArrowIcon  color="primary" fontSize="20"/>
            </div>
          </div>
        ) : null}
        {isOpen ? (
          <div>
            <div className="popup-overlay">
              <div className="close-icon" onClick={handleClosePopup}>
                <CloseIcon />
              </div>
            </div>
            <Video
              autoPlay
              loop
              controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
              poster={image}
            >
              <source src={vid} type="video/mp4" />
            </Video>
          </div>
        ) : null}
      <Footer />
    </div>
  )
}

export default index