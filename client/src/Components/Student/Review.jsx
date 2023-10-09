import React, { useEffect } from "react";
import axios from "axios";

const URI = "http://localhost:5000/api/student/myteachers";

const Review = () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>Review</div>;
};

export default Review;
