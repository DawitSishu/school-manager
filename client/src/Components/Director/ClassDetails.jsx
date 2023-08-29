import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

// /api/classes/:id
const URI = "http://localhost:5000/api/classes";

const ClassDetails = ({ classes, onClose }) => {
  const [students, setStudents] = useState(null);
  const [waiting, setWaiting] = useState(true);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getStudentList = async () => {
    setWaiting(true);
    try {
      const result = await axios.get(`${URI}/${classes.class_id}`, config);
      setStudents(result.data);
    } catch (error) {
      alert(error.response.data.message);
    }
    setWaiting(false);
  };
  useEffect(() => {
    getStudentList();
  }, []);

  return waiting ? (
    <Spinner />
  ) : (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Class Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Class Name:</strong> {classes.class_name}
        </DialogContentText>
        <DialogContentText>
          <strong>Home Room Teacher:</strong>{" "} 
          {/* dave eziga  */}
          {classes.homeroom_teacher ? classes.homeroom_teacher : "NOT ASSIGNED"}
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
        {students ? (
          <>
            {students.map((student, key) => (
              <DialogContentText key={key}>
                <strong>{student.student_id}:</strong> {student.full_name}
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
