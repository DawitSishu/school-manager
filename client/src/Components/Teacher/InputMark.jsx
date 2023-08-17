import { Button, Grid, Typography, Select, MenuItem, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import NumberInput from "./NumberInput";
import Spinner from "../Spinner/Spinner";

const BASE_URI = "http://localhost:5000/api/class/students";
const MARK_URI = "http://localhost:5000/api/students/marks";

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
  const [semister, setSemister] = useState("Select Semester");
  const [studentData, setStudentData] = useState(null);
  const [subject, setSubject] = useState(null);
  const [waiting, setWaiting] = useState(false);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getStudents = async () => {
    setWaiting(true);
    try {
      const result = await axios.post(
        BASE_URI,
        { class_name: selectedClass },
        config
      );
      if (result.data.students.length > 0) {
        const tmp = result.data.students.map((data) => ({
          id: data.student_id,
          name: data.full_name,
          report_card: JSON.parse(data.report_card),
        }));
        setStudentData(tmp);
        const teachers = JSON.parse(result.data.teachers.teachers);
        for (const [key, value] of Object.entries(teachers)) {
          if (value == teacher.teacher_id) {
            setSubject(key);
            break;
          }
        }
      }
      setWaiting(false);
    } catch (error) {
      alert("ERROR", error);
      setWaiting(false);
    }
  };

  const handleUpdateValue = (a, b) => {
    studentData[a].report_card[semister][subject] = parseInt(b);
  };

  const saveValues = async () => {
    setWaiting(true);
    try {
      const result = await axios.post(MARK_URI, studentData, config);
      alert(result.data.msg);
      setStudentData(null);
      setWaiting(false);
    } catch (error) {
      alert("ERROR:", error);
      setWaiting(false);
    }
  };

  return waiting ? (
    <Spinner />
  ) : (
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
      {studentData && subject ? (
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
      ) : null}
      <br />
      <br />
      {semister != "Select Semester" && studentData ? (
        <Box component="form">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">
                    Update {subject}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.map((std, idx) => (
                  <StyledTableRow key={idx}>
                    <StyledTableCell align="center">{std.id}</StyledTableCell>
                    <StyledTableCell align="center">{std.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <NumberInput
                        value={std.report_card[subject]}
                        onChange={(e) => handleUpdateValue(idx, e.target.value)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container justifyContent="center" m={2}>
            <Button
              onClick={saveValues}
              variant="contained"
              fullWidth
              sx={{ maxWidth: "300px" }}
            >
              save
            </Button>
          </Grid>
        </Box>
      ) : null}
    </Grid>
  );
};

export default InputMark;
