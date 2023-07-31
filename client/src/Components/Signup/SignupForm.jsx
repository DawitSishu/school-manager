import {
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useForm,Controller } from "react-hook-form";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AccountCircle } from "@mui/icons-material";
import EventIcon from '@mui/icons-material/Event';
// import { DatePicker, LocalizationProvider } from '@mui/lab';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { Link } from "react-router-dom";
// import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function SignUpForm(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
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
            <Controller
                    name="checkInDate"
                    control={control}
                    rules={{ required: "Check-In Date can't be empty" }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Check-In Date"
                          value={field.value || null}
                          onChange={(date) => field.onChange(date)}
                          textField={(params) => (
                            <OutlinedInput
                              {...params}
                              fullWidth
                              id="checkInDate"
                              type="text"
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                          sx={{ width: '100%' }}
                          error={!!errors.checkInDate}
                        />
                        {errors.checkInDate && (
                          <FormHelperText error>{errors.checkInDate.message}</FormHelperText>
                        )}
                      </LocalizationProvider>
                    )}
                  />
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
