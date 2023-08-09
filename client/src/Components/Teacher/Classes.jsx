import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URI = "http://localhost:5000/api/teacher/class";

const Classes = ({ teacher }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  console.log(selectedClass);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getClassData = async () => {
    try {
      const result = await axios.post(
        BASE_URI,
        { id: teacher.teacher_id },
        config
      );
      if (result.data != "") {
        let tmp = JSON.parse(result.data.students);
        setSelectedClass({ ...result.data, students: tmp });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassData();
  }, []);
  return (
    <Grid>
      <Grid container justifyContent="center">
        <Typography variant="h5" align="center">
          {selectedClass
            ? `You are home room teacher of ${selectedClass.class_name} `
            : "You are not a Home-Room Teacher"}
        </Typography>
      </Grid>
      {selectedClass ? (
        <Grid container justifyContent="center">
          <Button variant="contained">Display Students</Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Classes;
