import React, { useEffect } from "react";
import StudentTemplate from "../../../components/StudentTemplate";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentApplicationStatus } from "../../../actions/studentAction";

const StudentHomepage = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();
    
  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentApplicationStatusState = useSelector((state) => state.studentApplicationStatus);
  const { currentStudentInfo, applicationStatusMsg } = studentApplicationStatusState;

  useEffect(() => {
    dispatch(studentApplicationStatus());

      if (!studentInfo) {
        navigate("/");
      }
  }, [navigate, studentInfo]);

  return (
    <div>
      <StudentTemplate>
        {applicationStatusMsg && <>{currentStudentInfo.applicationStatusMsg}</>}
      </StudentTemplate>
    </div>
  )
}

export default StudentHomepage
