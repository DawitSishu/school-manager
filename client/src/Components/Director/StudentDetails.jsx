import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const StudentDetails = ({ student, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Student Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Full Name:</strong> {student.full_name}
        </DialogContentText>
        <DialogContentText>
          <strong>Email:</strong> {student.email}
        </DialogContentText>
        <DialogContentText>
          <strong>Date of Birth:</strong> {student.date_of_birth}
        </DialogContentText>
        <DialogContentText>
          <strong>Gender:</strong> {student.gender}
        </DialogContentText>
        <DialogContentText>
          <strong>Password:</strong> {student.password}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDetails;
