import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Rating, Box, Typography, TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const RatingComp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    // Call the onSubmit callback with the form data.
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="h6">Rate the Teacher</Typography>
      <Controller
        name="rating"
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <Rating
            name={field.name}
            value={field.value}
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            onChange={(_, value) => field.onChange(value)}
          />
        )}
      />
      <Box my={2}>
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          rules={{ required: 'Comment is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Add your comments"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              error={!!errors.comment}
              helperText={errors.comment ? errors.comment.message : ''}
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
