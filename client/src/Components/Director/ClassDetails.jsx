import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const ClassDetails = ({ classes, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Class Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Class Name:</strong> {classes.class_name}
        </DialogContentText>
        <DialogContentText>
          <strong>Home Room Teacher:</strong> {classes.homeroom_teacher ? classes.homeroom_teacher : "NOT ASSIGNED"}
        </DialogContentText>
        {classes.teachers ? (
          <>
            {Object.entries(classes.teachers).map(([key, value]) => (
              <DialogContentText key={key}>
                <strong>{key}:</strong> {value}
              </DialogContentText>
            ))}
          </>
        ) : null}
        {classes.students ? (
          <>
            {Object.entries(classes.students).map(([key, value]) => (
              <DialogContentText key={key}>
                <strong>{key}:</strong> {value}
              </DialogContentText>
            ))}
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassDetails;
