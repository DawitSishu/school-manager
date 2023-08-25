import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton,
  Menu,
} from "@mui/material";
import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import { Close as CloseIcon } from "@mui/icons-material";

import logo from "../../assets/1.jpeg";
import "./style.css";
import NavLinks from "./NavLinks";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const hoverStyle = {
    "&:hover": {
      transform: "scale(1.1)",
      borderBottom: "5px solid 	#FFBF00",
      elevation: "0",
    },
  };
  // rgba(128, 128, 128, 0.6)
  return (
    <AppBar
      position="fixed"
      className={navColour ? "sticky" : "navbar"}
      sx={{
        boxShadow: "none",
        backgroundColor: "transparent",
        width: "100vw",
        zIndex: 22,
      }}
    >
      <Toolbar
        sx={{
          "@media (max-width: 767px)": {
            display: "flex",
            justifyContent: "space-between",
          },
        }}
      >
        <Link to="hero">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => updateExpanded(false)}
          >
            <img src={logo} alt="brand" height="70" />
          </IconButton>
        </Link>
        <Container
          sx={{
            marginLeft: "15%",
            "@media (max-width: 767px)": {
              display: "none",
            },
          }}
        >
          <nav className="nav-items">
            <Link to="/">
              <Button sx={hoverStyle} color="primary">
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button sx={hoverStyle} color="primary">
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button sx={hoverStyle} color="primary">
              Contact
              </Button>
            </Link>
            <Link to="/login">
              <Button sx={hoverStyle} color="primary">
                Log In
              </Button>
            </Link>
          </nav>
        </Container>

        <IconButton
          className="navbar-toggler"
          edge="end"
          color="primary"
          aria-label="menu"
          onClick={(event) => {
            updateExpanded(expand ? false : "expanded");
            !anchorEl ? setAnchorEl(event.currentTarget) : setAnchorEl(null);
          }}
          sx={{
            display: "none",
            "@media (max-width: 767px)": {
              display: "block",
            },
          }}
        >
          {!anchorEl ? <MenuIcon /> : <CloseIcon />}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          sx={{
            backgroundColor: "transparent",
            display: "none",
            "@media (max-width: 767px)": {
              display: "block",
            },
            zIndex: 1,
          }}
        >
          <NavLinks />
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
