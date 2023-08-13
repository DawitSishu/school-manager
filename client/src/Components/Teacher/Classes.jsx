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

const BASE_URI = "http://localhost:5000/api/teacher/class";
const CLASS_URI = "http://localhost:5000/api/class/students";

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
      const result = await axios.get(`${CLASS_URI}/${selectedClass.class_id}`, config);
      const tmp = result.data.map((data) => ({
        id: data.student_id,
        name: data.full_name,
        report_card: JSON.parse(data.report_card),
      }));
      console.log(tmp);
      const val = Object.keys(tmp[0].report_card.semester_1);
      setStudents(tmp);
      setKeys(val);
    } catch (error) {
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
      <br />
      {selectedClass ? (
        <Grid container justifyContent="center">
          <Button variant="contained" onClick={getStudents}>
            Display Students
          </Button>
        </Grid>
      ) : null}
      <br />
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
      <br />
      <br />
      {semister !== "Select Semester" && selectedClass ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                {keys.map((key, idx) => (
                  <StyledTableCell align="center" key={idx}>
                    {key}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((std, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell align="center">{std.id}</StyledTableCell>
                  <StyledTableCell align="center">{std.name}</StyledTableCell>
                  {keys.map((elt, idx) => (
                    <StyledTableCell key={idx} align="center">
                      {std.report_card[semister][elt]}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Grid>
  );
};

export default Classes;
