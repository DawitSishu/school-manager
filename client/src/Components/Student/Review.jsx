import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const URI = "http://localhost:5000/api/student/myteachers";

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

const Review = () => {
  const [teachers, setTeachers] = useState(null);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getData = async () => {
    try {
      const response = await axios.get(URI, config);
      // let teach = JSON.parse(response.data.teachers);
      console.log(response.data);
      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return !teachers ? null : (
    <div>
      <Table sx={{ maxWidth: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Subject</StyledTableCell>
            <StyledTableCell align="center">Full Name</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(teachers).map((row, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell align="center">{row}</StyledTableCell>
              <StyledTableCell align="center">
                {teachers[row][1]}
              </StyledTableCell>
              <Button variant="contained">Review</Button>
            </StyledTableRow>
          ))}
          {/* {teachers.map((row, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell align="center">{row[0]}</StyledTableCell>
              <StyledTableCell
                align="center"
              >
                {}
              </StyledTableCell>
            </StyledTableRow>
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default Review;
