import React, { useEffect } from "react";
import FacultyTemplate from "../../../components/FacultyTemplate";
import moment from 'moment';
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
    <FacultyTemplate>
       <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
    </FacultyTemplate>  
  )
}
export default FacultyHomepage
