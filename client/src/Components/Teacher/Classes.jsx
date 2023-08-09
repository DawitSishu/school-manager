import { Button, Grid, Typography, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URI = "http://localhost:5000/api/teacher/class";

const Classes = ({ teacher }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState(null);
  const [semister, setSemister] = useState("Select Semester");
  const [keys, setKeys] = useState(null);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (event) => {
    setSemister(event.target.value);
  };

  const getStudents = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/class/students/5",
        config
      );
      const tmp = result.data.map(
        (data) => (data.report_card = JSON.parse(data.report_card))
      );
      const val = Object.keys(result.data[0].report_card.semester_1);
      setStudents(tmp);
      setKeys(val);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
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
          <Button variant="contained" onClick={getStudents}>
            Display Students
          </Button>
        </Grid>
      ) : null}
      {students ? (
        <Select
          labelId="Semister"
          id="Semister"
          value={semister}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Select Semester">Select Semester</MenuItem>
          <MenuItem value="semester_1">semester_1</MenuItem>
          <MenuItem value="semester_2">semester_2</MenuItem>
          <MenuItem value="semester_3">semester_3</MenuItem>
          <MenuItem value="semester_4">semester_4</MenuItem>
        </Select>
      ) : null}
      {semister !== "Select Semester" ? <>table</> : null}
    </Grid>
  );
};

export default Classes;
