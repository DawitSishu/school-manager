import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const BASE_URI = "http://localhost:5000/api/student/profile/update";

const Profile = ({ student }) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [waiting, setWaiting] = useState(false);

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPassword("");
  };

  const handleSavePassword = async () => {
    setWaiting(true);
    try {
      const result = await axios.put(
        BASE_URI,
        { password: newPassword },
        config
      );
      alert(result.data.msg);
      setWaiting(false);
    } catch (error) {
      alert("EROOR", error);
      setWaiting(false);
    }
    handleClose();
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  return waiting ? (
    <Spinner />
  ) : (
    <Card sx={{ margin: "auto", marginTop: 4 }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontSize: 18, fontWeight: "bold", marginBottom: 2 }}
        >
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Full Name: {student.full_name}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Gender: {student.gender}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Email: {student.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Date of Birth: {student.date_of_birth.split("T")[0]}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              student ID: {student.student_id}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Grid container justifyContent="center" m={3}>
        <Button variant="contained" onClick={handleOpen}>
          Update Password
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <OutlinedInput
            fullWidth
            id="New Password"
            placeholder="New Password"
            type={showPassword ? "text" : "password"}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleSavePassword}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Profile;
