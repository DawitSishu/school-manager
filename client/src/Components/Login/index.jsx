import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AccountCircle } from "@mui/icons-material";
import axios from "axios";

const BASE_URI = "http://localhost:5000/api/users/login";

const index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   try {
    const token = await (await axios.post(BASE_URI,{...data})).data;
    console.log(token);
   } catch (error) {
    setErr(error.response.data.message);
   }
  };

  return (
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
