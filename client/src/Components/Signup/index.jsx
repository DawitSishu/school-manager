import { Button, Typography, Box, Select, MenuItem,Snackbar,Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AccountCircle, LineAxisOutlined } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

import { TextField, Autocomplete } from "@mui/material";

import Spinner from "../Spinner/Spinner"; //to be used

const BASE_URI = "http://localhost:5000/api/users/signup";

const subj = [
  "Mathematics",
  "Biology",
  "Physics",
  "Chemistry",
  "English",
  "History",
  "Geography",
  "Amharic",
  "Technical Drawing",
];
function index() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedValue, setSelectedValue] = useState("student");
  const [wait, setWait] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      data.email
    );
    if (validEmail) {
      setWait(true);
      let fialdate =
        data.birth_date != null
          ? data.birth_date.toISOString().split("T")[0]
          : null;
      let finalData = { ...data, role: selectedValue, birth_date: fialdate };
      try {
        let result = await axios.post(BASE_URI, finalData);
        setSuccess(true);
        setWait(false);
      } catch (error) {
        setErr(error.response.data.message);
        setWait(false);
      }
    } else {
      alert(`${data.email} is not a valid email`);
    }
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    success(false);
  };
  return wait ? (
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
        Create a New Account
      </Typography>
      <br />
      {err && (
        <Typography color="red" variant="h7">
          {err}
        </Typography>
      )}
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {`${selectedValue} created successfully!!!`}
        </Alert>
      </Snackbar>
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
          <Controller
            name="subjects"
            control={control}
            rules={{ required: "Please select at least one subject" }} // Add any validation rules as needed
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                value={field.value || []} // Set the initial value to an empty array
                options={subj}
                getOptionLabel={(option) => option}
                onChange={(event, value) => field.onChange(value)} // Handle onChange to update the value
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Subjects"
                    placeholder="Select Subjects"
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <MenuItem {...props} key={option} value={option}>
                    {option}
                    {selected ? (
                      <Box component="span" color="info.main">
                        &#10003;
                      </Box>
                    ) : null}
                  </MenuItem>
                )}
              />
            )}
          />
          {errors.subjects && (
            <Typography variant="h7" color="red">
              {errors.subjects.message}
            </Typography>
          )}
          <br />
        </>
      ) : (
        selectedValue === "student" && (
          <>
            <Controller
              name="birth_date"
              control={control}
              rules={{ required: "Birth Date can't be empty" }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birth Date"
                    value={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    textField={(params) => (
                      <OutlinedInput
                        {...params}
                        fullWidth
                        id="birth_date"
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
                    sx={{ width: "100%" }}
                    error={!!errors.birth_date}
                  />
                </LocalizationProvider>
              )}
            />
            {errors.birth_date && (
              <Typography variant="h7" color="red">
                {errors.birth_date.message}
              </Typography>
            )}
            <br />
            <br />
          </>
        )
      )}
      <OutlinedInput
        fullWidth
        sx={{
          border: "0.5px solid white",
        }}
        placeholder="Full Name"
        id="full_name"
        {...register("full_name", { required: "full_name can't be empty" })}
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
        Sign Up
      </Button>
    </Box>
  );
}

export default index;
