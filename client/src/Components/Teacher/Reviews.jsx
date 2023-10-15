import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
  Box,
  Rating,
} from "@mui/material";
import axios from "axios";

const BASE_URI = "http://localhost:5000/api/teacher/myreviews";

const Reviews = ({ config }) => {
  const reviews = [
    { message: "Great service, I'll definitely come back!", rating: "3" },
    { message: "Awesome experience. Loved the food!", rating: "2" },
    { message: "Fantastic place for a family dinner.", rating: "1.5" },
  ];

  const primaryAvatarStyle = {
    backgroundColor: "#FFFF00",
    color: "#000",
  };

  const cardStyle = {
    border: "2px solid #FFFF00",
    borderRadius: "10px",
    margin: "10px",
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(BASE_URI, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center">
        Student Reviews
      </Typography>
      <Grid container spacing={2}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={cardStyle}>
              <CardHeader
                avatar={<Avatar style={primaryAvatarStyle}></Avatar>}
              />
              <CardContent>
                <Typography variant="body1">{review.message}</Typography>
                <Box>
                  <Rating
                    value={parseFloat(review.rating)}
                    readOnly
                    precision={0.5}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Reviews;
