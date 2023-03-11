import React, { useEffect } from "react";
import FacultySidebar from "../../../components/FacultySidebar";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const FacultyHomepage = () => {

  let navigate = useNavigate();

  const facultyLoginState = useSelector((state) => state.facultyLogin);
  const { facultyInfo } = facultyLoginState;

  useEffect(() => {
      if (!facultyInfo) {
        navigate("/");
      }
  }, [navigate, facultyInfo]);

  return (
    <div>
      <FacultySidebar />
    </div>  
  )
}
export default FacultyHomepage
