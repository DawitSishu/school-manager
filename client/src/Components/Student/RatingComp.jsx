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

const BASE_URI = "http://localhost:5000/api/student/review/teacher";

const RatingComp = ({ config, teacher, back }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    console.log(config);
    console.log(teacher);
  }, []);

  const handleFormSubmit = (data) => {
    if (!data.rating) {
      data.rating = 0;
    }
    console.log(data);
    console.log(data);
    // back();
  };

  return (
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
          setValue("rating", value); // Use setValue function
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
