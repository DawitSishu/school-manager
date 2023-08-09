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
import ClassDetails from "./ClassDetails";

const BASE_URI = "http://localhost:5000/api/classes";

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

const Classes = () => {
  const [classes, setClasses] = useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getClassDetail = async (id) => {
    if (id.teachers){
        let temp
        try {
             temp = JSON.parse(id.teachers);
          } catch (error) {
           temp = id.teachers
          }
        
        id.teachers = temp;
    }
    if (id.students){
        let temp
        try {
             temp = JSON.parse(id.students);
          } catch (error) {
           temp = id.students
          }
        
        id.students = temp;
    }
      setId(id);
    setOpen(true);
  };
  const getClasses = async () => {
    try {
      const result = await axios.get(BASE_URI, config);
      setClasses(result.data);
    } catch (error) {
      alert(error.message);
    }
  };
  
  useEffect(() => {
    getClasses();
  },[]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClass = classes
    ? classes.filter(
        (row) =>
          row.class_name &&
          row.class_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return classes ? (
    <div>
      {open ? (
        <ClassDetails onClose={() => setOpen(false)} classes={id} />
      ) : null}
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
              <StyledTableCell align="center">Class Name</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClass.map((row) => (
              <StyledTableRow key={row.class_id}>
                <StyledTableCell component="th" scope="row">
                  {row.class_id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.class_name}
                </StyledTableCell >
                <StyledTableCell align="left">
                  <Button
                    className="assignButton"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderWidth: "1px",
                      borderColor: "green",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => getClassDetail(row)}
                  >
                    details
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

export default Classes;
