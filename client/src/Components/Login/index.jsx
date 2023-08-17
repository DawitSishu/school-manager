import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Box } from "@mui/material";
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

const index = () => {
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
    try {
      const response = await axios.post(BASE_URI, { ...data });
      if (response) {
        localStorage.clear();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        console.log(response.data.role);
        response.data.role == "teacher"
          ? navigate("/teacher")
          : response.data.role == "admin"
          ? navigate("/director")
          : navigate("/profile");
      }
      setWaiting(false);
    } catch (error) {
      setErr(error.response.data.message);
      setWaiting(false);
    }
  };

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
    <Box
      sx={{
        padding: 10,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" align="center">
        Log In To Your Account
      </Typography>
      <br />
      {err && (
        <Typography color="red" variant="h7" align="center">
          {err}
        </Typography>
      )}
      <br />
      <br />
      <OutlinedInput
        fullWidth
        sx={{
          border: "0.5px solid white",
        }}
        placeholder="Email"
        id="email"
        {...register("email", { required: "email can't be empty" })}
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
      />
      <br />
      {errors.email && (
        <Typography variant="h7" color="red">
          {errors.email.message}
        </Typography>
      )}
      <br />
      <OutlinedInput
        fullWidth
        sx={{
          border: "0.5px solid white",
        }}
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
      <br />
      {errors.password && (
        <Typography variant="h7" color="red">
          {errors.password.message}
        </Typography>
      )}
      <br />
      <Button type="submit" variant="contained">
        Log In
      </Button>
    </Box>
  );
};

export default index;
