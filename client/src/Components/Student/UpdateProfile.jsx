import {
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";
import Spinner from "../Spinner/Spinner";

const UpdateProfile = ({ student }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [wait, setWait] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // setWait(true);
    let fialdate = (data.birth_date = data.birth_date
      .toISOString()
      .split("T")[0]);
    let finalData = { ...data, birth_date: fialdate };
    console.log(finalData);
    // try {
    //   // let result = await axios.post(BASE_URI, { ...finalData }, config);
    //   setErr("");
    //   setWait(false);
    // } catch (error) {
    //   setErr(error.response.data.message);
    //   setWait(false);
    // }
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center">
        Please Update Your Profile
      </Typography>
      <br />
      <br />
      {err && (
        <Typography color="red" variant="h7">
          {err}
        </Typography>
      )}
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

      <Controller
        name="gender"
        control={control}
        defaultValue="Male"
        render={({ field }) => (
          <Select
            {...field}
            labelId="gender"
            id="gender"
            value={field.value || ""}
            onChange={field.onChange}
            fullWidth
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        )}
      />
      <br />
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
      <br />
      {errors.password && (
        <Typography variant="h7" color="red">
          {errors.password.message}
        </Typography>
      )}
      <br />
      <br />
      <Button type="submit" variant="contained">
        Update
      </Button>
    </Box>
  );
};

export default UpdateProfile;
