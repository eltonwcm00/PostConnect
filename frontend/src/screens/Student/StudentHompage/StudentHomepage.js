import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { studentStatus } from "../../../actions/studentAction";
import StudentTemplate from "../../../components/StudentTemplate";
import Notification from "../../../components/Notification";
import TerminationPopout from "../../../components/TerminationPopout";

import './StudentHomepage.css';

const StudentHomepage = () => {

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.studentLogin.studentInfo || {});

  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentStatusState = useSelector((state) => state.studentStatusValidator);
  const { flag, studentTerminationStatus } = studentStatusState;

  const [access, setAccess] = useState();

  
  useEffect(() => {
    if (studentInfo) {
      dispatch(studentStatus());
    }
  }, []);

  useEffect(() => {
  const fetching = async () => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/student/systemReadVerifyStudentStatus`,
        config
      );

      setAccess(data.isStudent);

      console.log(data);
    }
  };
  fetching();
}, [dispatch, token]);
  return (
    <>
        {
          (access === true) ?
            <StudentTemplate> 
              <Notification />
            </StudentTemplate> 
            : 
            <TerminationPopout message={flag && <>{studentTerminationStatus.terminateMsg}</>}/>
        }    
    </> 
  )
}

export default StudentHomepage
