import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import ReviewComp from "./RatingComp";
import Spinner from "../Spinner/Spinner";

const URI = "http://localhost:5000/api/student/myteachers";
const CHECK = "http://localhost:5000/api/student/check/review";

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
  const [showReview, setShowReview] = useState(false);
  const [status, setStatus] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [waiting, setWaiting] = useState(false);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getData = async () => {
    try {
      const response = await axios.get(URI, config);
      console.log(response.data);
      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkDates = async () => {
    try {
      const response = await axios.get(CHECK, config);
      setStatus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setWaiting(true);
    checkDates();
    getData();
    setWaiting(false);
  }, []);

  const handleReviewClick = (teacherData) => {
    setSelectedTeacher(teacherData);
    setShowReview(true);
  };

  const removeReview = () => {
    setShowReview(false);
  };

  if (showReview) {
    return (
      <ReviewComp
        config={config}
        teacher={selectedTeacher}
        back={removeReview}
      />
    );
  }

  return waiting ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Spinner />
    </div>
  ) : status && !status[0] ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h5">{status[1]}</Typography>
    </div>
  ) : !teachers ? null : (
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
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  onClick={() => handleReviewClick(teachers[row])}
                >
                  Review
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Review;
