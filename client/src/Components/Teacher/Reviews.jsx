import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

const Reviews = () => {
  const reviews = [
    { message: "Great service, I'll definitely come back!" },
    { message: "Awesome experience. Loved the food!" },
    { message: "Fantastic place for a family dinner." },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Student Reviews
      </Typography>
      <Grid container spacing={2}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="review-card">
              <CardHeader avatar={<Avatar className="review-avatar" />} />
              <CardContent>
                <Typography variant="body1" className="review-message">
                  {review.message}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Reviews;
