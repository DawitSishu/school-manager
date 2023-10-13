import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Rating,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import toastr from "toastr";
import "toastr/build/toastr.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const BASE_URI = "http://localhost:5000/api/student/review/teacher";

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

const RatingComp = ({ config, teacher, back }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [ratingValue, setRatingValue] = useState(0);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    console.log(config);
    console.log(teacher);
  }, []);

  const handleFormSubmit = async (data) => {
    setWaiting(true);
    if (!data.rating) {
      data.rating = 0;
    }
    try {
      const respose = await axios.post(
        BASE_URI,
        { ...data, teacher_id: teacher[0] },
        config
      );
      toastr.success(respose.data.msg);
    } catch (error) {
      toastr.warning("ERROR: Please Try again!");
    }
    setWaiting(false);
    back();
  };

  return waiting ? (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  ) : (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <IconButton onClick={back}>
        {" "}
        <ArrowBackIcon color="#000000" />
      </IconButton>
      <Typography variant="h6">Rate the Teacher</Typography>
      <Rating
        name="rating"
        value={ratingValue}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        onChange={(_, value) => {
          setRatingValue(value);
          setValue("rating", value);
        }}
      />
      <Typography variant="subtitle1">{ratingValue}</Typography>
      <Box my={2}>
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          rules={{ required: "Comment is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Add your comments"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              error={!!errors.comment}
              helperText={errors.comment ? errors.comment.message : ""}
            />
          )}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Submit Rating
      </Button>
    </form>
  );
};

export default RatingComp;
