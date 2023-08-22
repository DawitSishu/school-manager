// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Container,
//   Button,
//   IconButton,
//   Menu,
//   Switch,
//   styled,
// } from "@mui/material";
// // import { Link } from 'react-scroll';
// import { Link, Outlet } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Close as CloseIcon } from "@mui/icons-material";

// // import logo from "../../../Assets/react.svg";
// import logo from "../../assets/react.svg";
// import { Brightness4, Brightness7 } from "@mui/icons-material";


// const CustomSwitch = styled(Switch)(({ theme }) => ({
//   "& .MuiSwitch-thumb": {
//     boxShadow: "none",
//     width: "20px",
//     height: "20px",
//     backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
//   },
//   "& .MuiSwitch-track": {
//     backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
//   },
// }));

// function NavBar({modeHandler}) {
//   const [expand, updateExpanded] = useState(false);
//   const [navColour, updateNavbar] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [darkMode, setDarkMode] = useState(true);

//   const handleDarkModeToggle = () => {
//     setDarkMode(!darkMode);
//     modeHandler();
//   };
//   function scrollHandler() {
//     if (window.scrollY >= 20) {
//       updateNavbar(true);
//     } else {
//       updateNavbar(false);
//     }
//   }

//   window.addEventListener("scroll", scrollHandler);

//   const hoverStyle = {
//     "&:hover": {
//       transform: "scale(1.1)",
//       borderBottom: "5px solid #008080",
//       elevation: "0",
//     },
//   };
//   // rgba(128, 128, 128, 0.6)
//   return (
//         <AppBar
//           position="fixed"
//           sx={{
//             boxShadow: "none",
//             backgroundColor:'transparent',
//             // backgroundColor: "rgba(128, 128, 128, 0.4)",
//             // color:`${darkMode ? 'white' : 'rgba(51, 51, 51, 1)'}`,
//             boxShadow: '0px 3px 3px 0px rgba(9, 5, 29, 0.171)',
//             elevation: 5,
//             width:'100vw',
//             zIndex:22,
//           }}
//         >
//           <Toolbar
//             sx={{
//               "@media (max-width: 767px)": {
//                 display: "flex",
//                 justifyContent: "space-between",
//               },
//             }}
//           >
//           <Link
//             activeClass="active"
//             to="hero"
//             spy={true}
//             smooth={true}
//             offset={-70}
//             duration={500}
//           >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="home"
//               onClick={() => updateExpanded(false)}
//             >
//                <img src={logo} alt="brand" height='70' />
//             </IconButton>
//           </Link>
//             <Container
//               sx={{
//                 marginLeft: "15%",
//                 "@media (max-width: 767px)": {
//                   display: "none",
//                 },
//               }}
//             >
//               <nav className="nav-items">
//               <Link
//                   activeClass="active"
//                   to="hero"
//                   spy={true}
//                   smooth={true}
//                   offset={-70}
//                   duration={500}
//                 >
//                 <Button
//                   sx={hoverStyle}
//                   color="inherit"
                  
//                 >
//                   Home
//                 </Button>
//                 </Link>
//                 <Link
//                   activeClass="active"
//                   to="about"
//                   spy={true}
//                   smooth={true}
//                   offset={-70}
//                   duration={500}
//                 >
//                 <Button
//                   sx={hoverStyle}
//                   color="inherit"
                 
//                 >
//                   About
//                 </Button>
//                 </Link>
//                 <Link
//                   activeClass="active"
//                   to="projects"
//                   spy={true}
//                   smooth={true}
//                   offset={-70}
//                   duration={500}
//                 >
//                 <Button
//                   sx={hoverStyle}
//                   color="inherit"
                  
//                 >
//                   Projects
//                 </Button>
//                 </Link>
//                 <Link
//                   activeClass="active"
//                   to="contact"
//                   spy={true}
//                   smooth={true}
//                   offset={-70}
//                   duration={500}
//                 >
//                 <Button
//                   sx={hoverStyle}
//                   color="inherit"
                  
//                 >
//                   Contact
//                 </Button>
//                 </Link>
//               </nav>
//             </Container>
//             <CustomSwitch
//               checked={darkMode}
//               onChange={handleDarkModeToggle}
//               color="default"
//               icon={<Brightness7 sx={{color:'rgba(51, 51, 51, 0.8)'}}/>}
//               checkedIcon={<Brightness4 />}
//               sx={{
//                 "& .MuiSwitch-thumb": {
//                   borderRadius: "50%",
//                 },
//               }}
//             />
//             <IconButton
//               className="navbar-toggler"
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={(event) => {
//                 updateExpanded(expand ? false : "expanded");
//                 !anchorEl ? setAnchorEl(event.currentTarget) : setAnchorEl(null);
//               }}
//               sx={{
//                 display: "none",
//                 "@media (max-width: 767px)": {
//                   display: "block",
//                 },
//               }}
//             >
//               {!anchorEl ? <MenuIcon /> : <CloseIcon />}
//             </IconButton>
            
//             {/* <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={() => setAnchorEl(null)}
//               sx={{
//                 backgroundColor: "transparent",
//                 display: "none",
//                 "@media (max-width: 767px)": {
//                   display: "block",
//                 },
//                 zIndex: 1,
//               }}
//             >
//               <NavLinks />
//             </Menu> */}
//           </Toolbar>
//         </AppBar>
//   );
// }

// export default NavBar;