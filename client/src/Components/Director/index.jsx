import { useState, useEffect } from "react";
import {
  Toolbar,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Teachers from "./Teachers";
import Students from "./Students";
import Classes from "./Classes";
import CreateUser from "./CreateUser";
import Spinner from "../Spinner/Spinner";
import ReviewDates from "./ReviewDates";
import EventIcon from "@mui/icons-material/Event";

const BASE_URI_MAIN = "http://localhost:5000/api/users/";
const BASE_URI_LESS = "http://localhost:5000/api/director/me";

const drawerWidth = 240;

const iconMap = {
  Classes: <SchoolIcon />,
  Teachers: <AccountCircleIcon />,
  Students: <PeopleIcon />,
  "Create User": <PersonAddIcon />,
  "Review Date": <EventIcon />,
};

const index = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Classes");
  const [user, setUser] = useState(null);
  const [waiting, setWaiting] = useState(true);
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleItemClick = (text) => {
    setSelectedItem(text);
    setMobileOpen(false);
  };
  const check = async () => {
    if (!role || !token) {
      navigate("/");
      return;
    }

    try {
      const result = await axios.post(BASE_URI_MAIN, { role }, config);
      if (result.data != "admin") {
        localStorage.clear();
        navigate("/");
      }
      return;
    } catch (error) {
      // alert("Eroor : Try agaain")
      navigate("/");
    }
  };
  const getUser = async () => {
    try {
      const result = await axios.get(BASE_URI_LESS, config);
      setUser(result.data);
    } catch (error) {
      alert("Eroor : Try agaain");
      // console.log(error);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    setWaiting(true);
    check();
    getUser();
    setWaiting(false);
  }, []);
  const drawer = (
    <div>
      <Toolbar>
        {user ? <Typography>{user.full_name}</Typography> : null}
      </Toolbar>
      <Divider />
      <List>
        {["Classes", "Teachers", "Students", "Create User", "Review Date"].map(
          (text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleItemClick(text)}>
                <ListItemIcon>{iconMap[text]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return waiting ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
          <Button
            variant="outlined"
            sx={{ color: "black" }}
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectedItem == "Teachers" ? (
          <Teachers />
        ) : selectedItem == "Students" ? (
          <Students />
        ) : selectedItem == "Classes" ? (
          <Classes />
        ) : selectedItem == "Create User" ? (
          <CreateUser />
        ) : selectedItem == "Review Date" ? (
          <ReviewDates />
        ) : (
          <Typography paragraph>{selectedItem}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default index;
