import {
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

function SignUpForm(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      data.email
    );
    if (validEmail) {
      // props.onSubmit(data)
    } else {
      alert(`${data.email} is not a valid email`);
    }
  };
  const [selectedValue, setSelectedValue] = useState("student");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: 10,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5">Create a New Account</Typography>
      <br />
      <Typography color="red" variant="h7">
        {props.err}
      </Typography>
      <br />
      <Select
        labelId="role"
        id="role"
        value={selectedValue}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="teacher">Teacher</MenuItem>
      </Select>
      <br /> <br />
      {selectedValue === "teacher" ? (
        <>
          <OutlinedInput
            fullWidth
            sx={{
              border: "0.5px solid white",
            }}
            placeholder="Subject"
            id="subject"
            {...register("subject", { required: "Subject can't be empty" })}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
          <br />
          {errors.dob && (
            <Typography variant="h7">{errors.dob.message}</Typography>
          )}
          <br />
        </>
      ) : (
        selectedValue === "student" && (
          <>
            <OutlinedInput
              fullWidth
              sx={{
                border: "0.5px solid white",
              }}
              placeholder="Date of Birth"
              id="dob"
              {...register("dob", { required: "Date of Birth can't be empty" })}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
            <br />
            {errors.dob && (
              <Typography variant="h7">{errors.dob.message}</Typography>
            )}
            <br />
          </>
        )
      )}
      <OutlinedInput
        fullWidth
        sx={{
          border: "0.5px solid white",
        }}
        placeholder="Username"
        id="username"
        {...register("username", { required: "Username can't be empty" })}
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
      />
      <br />
      {errors.email && (
        <Typography variant="h7">{errors.email.message}</Typography>
      )}
      <br />
      <OutlinedInput
        sx={{
          border: "0.5px solid white",
        }}
        placeholder="Email"
        fullWidth
        id="email"
        {...register("email", { required: "Email can't be empty" })}
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
      />
      <br />
      {errors.email && (
        <Typography variant="h7">{errors.email.message}</Typography>
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
        <Typography variant="h7">{errors.password.message}</Typography>
      )}
      <br />
      <Button type="submit" variant="contained">
        Sign Up
      </Button>
    </Box>
  );
}

export default SignUpForm;
