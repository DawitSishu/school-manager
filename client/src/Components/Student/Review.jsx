import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import ReviewComp from "./RatingComp"; // Import your ReviewComp component

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
  const [showReview, setShowReview] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

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

  useEffect(() => {
    getData();
  }, []);

  // Function to handle the "Review" button click
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
