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

const BASE_URI = "http://localhost:5000/api/teacher";

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
const Teachers = () => {
  const [teachers, setTeachers] = useState(null);
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getTeachers = async () => {
    try {
      const result = await axios.get(BASE_URI, config);
      setTeachers(result.data);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getTeachers();
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeachers = teachers
    ? teachers.filter(
        (row) =>
          row.full_name &&
          row.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return teachers ? (
    <div>
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
              <StyledTableCell align="center">Teaching Class</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((row) => (
              <StyledTableRow key={row.teacher_id}>
                <StyledTableCell component="th" scope="row">
                  {row.teacher_id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.full_name}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.teaching_class  ? JSON.parse(row.teaching_class).join(", ") : "Not Assigned"}
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
                    }}
                  >
                    Assign
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    className="updateButton"
                    style={{
                      backgroundColor: "yellow",
                      borderWidth: "1px",
                      borderColor: "yellow",
                      borderRadius: "4px",
                    }}
                  >
                    update
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

export default Teachers;
