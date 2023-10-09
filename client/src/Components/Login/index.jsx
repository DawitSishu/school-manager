import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AccountCircle } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const BASE_URI = "http://localhost:5000/api/users/login";

const Index = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setWaiting(true);
    for (const key in data) {
      if (typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    }

    try {
      const response = await axios.post(BASE_URI, { ...data });
      if (response) {
        localStorage.clear();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        console.log(response.data.role);
        response.data.role === "teacher"
          ? navigate("/teacher")
          : response.data.role === "admin"
          ? navigate("/director")
          : navigate("/profile");
      }
      setWaiting(false);
    } catch (error) {
      setErr(error.response.data.message);
      setWaiting(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            padding: 3,
            border: "1px solid #ccc",
            borderRadius: 8,
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h5" align="center">
            Log In To Your Account
          </Typography>
          {err && (
            <Typography variant="body1" color="error" align="center">
              {err}
            </Typography>
          )}
          <br />
          <OutlinedInput
            fullWidth
            placeholder="Email"
            id="email"
            {...register("email", { required: "Email can't be empty" })}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
          {errors.email && (
            <Typography variant="body2" color="error">
              {errors.email.message}
            </Typography>
          )}
          <br />
          <br />
          <OutlinedInput
            fullWidth
            id="password"
            placeholder="Password"
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
            {...register("password", { required: "Password can't be empty" })}
          />
          {errors.password && (
            <Typography variant="body2" color="error">
              {errors.password.message}
            </Typography>
          )}
          <br />
          <br />
          <Button type="submit" variant="contained" fullWidth>
            Log In
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Index;
