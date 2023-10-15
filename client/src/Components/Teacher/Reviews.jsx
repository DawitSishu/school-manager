import React, { useEffect, useState } from "react";
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
import Spinner from "../Spinner/Spinner";

const BASE_URI = "http://localhost:5000/api/teacher/myreviews";

const Reviews = ({ config }) => {
  const [reviews, setReviews] = useState(null);
  const [waiting, setWaiting] = useState(false);

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
    setWaiting(true);
    try {
      const response = await axios.get(BASE_URI, config);
      //   setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
    setWaiting(false);
  };

  useEffect(() => {
    getReviews();
  }, []);

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
  ) : reviews ? (
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
                <Typography variant="body1">{review.comment}</Typography>
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
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography align="center" variant="h4">
        You don't have any review as of now.
      </Typography>
    </div>
  );
};

export default Reviews;
