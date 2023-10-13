import { useForm, Controller } from "react-hook-form";
import { Grid, Box, Button, Typography, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventIcon from "@mui/icons-material/Event";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import toastr from "toastr";
import { useState } from "react";

const BASE_URI = "http://localhost:5000/api/reviews/dates";

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

function ReviewDates() {
  const [waiting, setWaiting] = useState(false);

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
    watch,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    setWaiting(true);
    data.end_date = data.end_date.toISOString().split("T")[0];
    data.start_date = data.start_date.toISOString().split("T")[0];
    try {
      const response = await axios.put(BASE_URI, { ...data }, config);
      toastr.success(response.data.msg);
    } catch (error) {
      toastr.warning("ERROR: Please Try again!");
    }
    setWaiting(false);
  };

  const isStartSelected = !!watch("start_date");

  const isDateValid = (selectedDate) => {
    return selectedDate <= new Date();
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
    <Paper
      elevation={3}
      style={{ padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" gutterBottom>
        Review Dates
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="start_date"
            control={control}
            rules={{ required: "Starting Date can't be empty" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={field.value || null}
                  onChange={(date) => {
                    field.onChange(date);
                    setValue("end_date", null);
                  }}
                  renderInput={(params) => (
                    <OutlinedInput
                      {...params}
                      fullWidth
                      id="start_date"
                      type="text"
                      style={{ backgroundColor: "white" }}
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
                  error={!!errors.start_date}
                  shouldDisableDate={isDateValid}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          {isStartSelected ? (
            <Controller
              name="end_date"
              control={control}
              rules={{ required: "Ending Date can't be empty" }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    renderInput={(params) => (
                      <OutlinedInput
                        {...params}
                        fullWidth
                        id="end_date"
                        type="text"
                        style={{ backgroundColor: "white" }}
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
                    error={!!errors.end_date}
                    shouldDisableDate={(date) => {
                      return date <= new Date(watch("start_date"));
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              Select a Start Date to enable End Date
            </Typography>
          )}
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        style={{
          marginTop: "16px",
          backgroundColor: "#FFFF00",
          color: "black",
        }}
      >
        Submit
      </Button>
    </Paper>
  );
}

export default ReviewDates;
