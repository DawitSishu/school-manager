import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";

const Profile = ({ teacher }) => {
  return (
    <Card sx={{ margin: "auto", marginTop: 4 }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontSize: 18, fontWeight: "bold", marginBottom: 2 }}
        >
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Full Name: {teacher.full_name}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Gender: {teacher.gender}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Email: {teacher.email}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Teacher ID: {teacher.teacher_id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Subject: {JSON.parse(teacher.subject).join(", ")}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Teaching Class: {JSON.parse(teacher.teaching_class).join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Grid container justifyContent="center" m={3}>
        <Button variant="contained">Update Password</Button>
      </Grid>
    </Card>
  );
};

export default Profile;
