import { Button, Grid, Typography, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URI = "http://localhost:5000/api/class/students";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const InputMark = ({ teacher }) => {
  const Classes = JSON.parse(teacher.teaching_class);
  const [selectedClass, setSelectedClass] = useState("Select Class");

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getStudents = async () => {
    try {
      const result = await axios.post(
        BASE_URI,
        { class_name: selectedClass },
        config
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid>
      <Typography align="center" variant="h5">
        Select A Class
      </Typography>
      <Select
        labelId="Select Class"
        id="Select Class"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        fullWidth
      >
        <MenuItem value="Select Class">Select Class</MenuItem>
        {Classes.map((classes, idx) => {
          return (
            <MenuItem value={classes} key={idx}>
              {classes}
            </MenuItem>
          );
        })}
      </Select>
      {selectedClass != "Select Class" ? (
        <Grid container justifyContent="center" m={2}>
          <Button variant="contained" onClick={getStudents}>
            Get Students
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default InputMark;
