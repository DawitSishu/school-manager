import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, TextField } from "@mui/material";
import { Button } from "@mui/base";
import AssignTeacher from "./AssignTeacher";

const BASE_URI = "http://localhost:5000/api/students";
const ASSIGN_TEACHER_URI = "http://localhost:5000/api/classes/teacher";
const RESET_URI = "http://localhost:5000/api/student/reset";

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
const Students = () => {
  const [students, setStudents] = useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const resetPassword = async (id) => {
    try {
      const result = await axios.post(RESET_URI, { id }, config);
      alert(result.data.msg);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleClickOpen = (student) => {
    setId(student);
    setOpen(true);
  };
  const handleClickClose = async (data) => {
    console.log(data);
    try {
      const result = await axios.post(ASSIGN_TEACHER_URI, { ...data }, config);
      alert(result.data.msg);
    } catch (error) {
      alert(error.response.data.message);
    }
    setOpen(false);
    setId(null);
  };

  const getStudents = async () => {
    try {
      const result = await axios.get(BASE_URI, config);
      setStudents(result.data);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getStudents();
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students
    ? students.filter(
        (row) =>
          row.full_name &&
          row.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return students ? (
    <div>
      {open ? <AssignTeacher onClose={handleClickClose} data={id} /> : null}
      <TextField
        id="search"
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Full Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Password</StyledTableCell>
              <StyledTableCell align="center">Birth Date</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((row) => (
              <StyledTableRow key={row.student_id}>
                <StyledTableCell component="th" scope="row">
                  {row.student_id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.full_name}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.date_of_birth}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    className="assignButton"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderWidth: "1px",
                      borderColor: "green",
                      borderRadius: "4px",
                      cursor:"pointer"
                    }}
                    // onClick={() => handleClickOpen(row)}
                  >
                    details
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    className="updateButton"
                    style={{
                      backgroundColor: "yellow",
                      borderWidth: "1px",
                      borderColor: "yellow",
                      cursor:"pointer",
                      borderRadius: "4px",
                    }}
                    onClick={() => resetPassword(row.student_id)}
                  >
                    reset
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : null;
};

export default Students;
