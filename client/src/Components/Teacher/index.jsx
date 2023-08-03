import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BASE_URI_MAIN = "http://localhost:5000/api/users/";


const index = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const check = async () => {
      let token = localStorage.getItem("token");
      let role = localStorage.getItem("role");
      if (!role || !token){
        navigate("/");
      }
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      try {
        const result = await axios.post(BASE_URI_MAIN,{role,},config);
        if (result.data != 'teacher'){
          navigate('/')
        }
        return;
      } catch (error) {
        // alert("Eroor : Try agaain")
        navigate("/");
      }
    }
    check();
},[])

  


  return (
    <div>index</div>
  )
}

export default index