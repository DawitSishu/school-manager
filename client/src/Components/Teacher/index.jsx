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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Classes from "./Classes";
import InputMark from "./InputMark";
import Profile from "./Profile";

const BASE_URI_MAIN = "http://localhost:5000/api/users/";
const BASE_URI_LESS = "http://localhost:5000/api/teacher/me";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Profile");
  const [user, setUser] = useState(null);
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
      if (result.data != "teacher") {
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
      // alert("Eroor : Try agaain");
      console.log(error);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    check();
    getUser();
  }, []);
  const drawer = (
    <div>
      <Toolbar>
        {user ? <Typography>{user.full_name}</Typography> : null}
      </Toolbar>
      <Divider />
      <List>
        {["Profile", "My Classes", "Input Mark"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleItemClick(text)}>
              {" "}
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return user ? (
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
            Teacher Panel
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
        {selectedItem == "My Classes" ? (
          <Classes teacher={user} />
        ) : selectedItem == "Input Mark" ? (
          <InputMark teacher={user} />
        ) : (
          <Profile teacher={user} />
        )}
      </Box>
    </Box>
  ) : null;
}

export default ResponsiveDrawer;
