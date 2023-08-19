import { Grid, Select, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import React, { useState } from "react";
import Spinner from "../Spinner/Spinner";

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

const Marks = ({ student }) => {
  const [waiting, setWaiting] = useState(false);
  const [semister, setSemister] = useState("Select Semester");
  const reportCard = JSON.parse(student.report_card);
  const subs = Object.keys(reportCard["semester_1"]);
  return waiting ? (
    <Spinner />
  ) : (
    <Grid>
      <Grid container justifyContent="center" m={2}>
        <Typography align="center" variant="h5">
          Welcome {student.full_name} Select and view your Results
        </Typography>
      </Grid>
      <Grid mb={2}>
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
      {reportCard[semister] ? (
        <TableContainer
          component={Paper}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Table sx={{ maxWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Fields</StyledTableCell>
                <StyledTableCell align="center">Result</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subs.map((row, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell align="center">{row}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color:
                        reportCard[semister][row] < 55 && row[idx]
                          ? "red"
                          : "black",
                    }}
                  >
                    {reportCard[semister][row]}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Grid>
  );
};

export default Marks;
