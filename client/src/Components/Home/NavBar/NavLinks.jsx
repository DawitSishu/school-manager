import React from "react";
import { Button, MenuItem } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const NavLinks = () => {
  const hoverStyle = {
    "&:hover": {
      transform: "scale(1.1)",
      borderBottom: "5px solid #FFBF00",
      elevation: "0",
    },
  };

  return (
    <>
      <MenuItem>
        <Link to="/">
          <Button sx={hoverStyle} color="secondary">
            Home
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="about">
          <Button sx={hoverStyle} color="secondary">
            About
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="contact">
          <Button sx={hoverStyle} color="secondary">
            Contact
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="login">
          <Button sx={hoverStyle} color="secondary">
            Log In
          </Button>
        </Link>
      </MenuItem>
    </>
  );
};

export default NavLinks;
