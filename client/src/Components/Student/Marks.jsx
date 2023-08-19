import { Grid, Select, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";

const Marks = ({ student }) => {
  const [waiting, setWaiting] = useState(false);
  const [semister, setSemister] = useState("Select Semester");
  const reportCard = JSON.parse(student.report_card);
  return waiting ? (
    <Spinner />
  ) : (
    <Grid>
      <Grid container justifyContent="center" m={2}>
        <Typography align="center" variant="h5">
          Welcome {student.full_name} Select and view your Results
        </Typography>
      </Grid>
      <Grid>
        <Select
          labelId="Semister"
          id="Semister"
          value={semister}
          onChange={(e) => setSemister(e.target.value)}
          fullWidth
        >
          <MenuItem value="Select Semester">Select Semester</MenuItem>
          <MenuItem value="semester_1">semester_1</MenuItem>
          <MenuItem value="semester_2">semester_2</MenuItem>
          <MenuItem value="semester_3">semester_3</MenuItem>
          <MenuItem value="semester_4">semester_4</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default Marks;
