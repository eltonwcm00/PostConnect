import React, { useEffect } from "react";
import StudentSidebar from "../../../components/StudentSidebar";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const StudentHomepage = () => {

  let navigate = useNavigate();
    
  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;

  useEffect(() => {
      if (!studentInfo) {
        navigate("/");
      }
  }, [navigate, studentInfo]);

  return (
    <div>
      <StudentSidebar />
    </div>
  )
}

export default StudentHomepage
