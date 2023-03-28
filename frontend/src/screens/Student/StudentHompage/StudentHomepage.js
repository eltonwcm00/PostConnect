import React, { useEffect, useState } from "react";
import moment from 'moment';
import StudentTemplate from "../../../components/StudentTemplate";
import { Toast, ToastContainer } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentApplicationStatus } from "../../../actions/studentAction";

const StudentHomepage = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [rpdToastPosition, setRPDToastPosition] = useState('top-end');
  const [showToast, setShowToast] = useState(true);

  const toggleShowB = () => setShowToast(!showToast);
    
  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentApplicationStatusState = useSelector((state) => state.studentApplicationStatus);
  const { currentStudentInfo, applicationStatusMsg } = studentApplicationStatusState;

  useEffect(() => {
    dispatch(studentApplicationStatus());
      if (!studentInfo) {
        navigate("/");
      }
  }, [navigate, studentInfo, currentStudentInfo]);

  return (
    <div>
      <StudentTemplate>
        <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
        <ToastContainer className="p-5" position={rpdToastPosition}>
          <Toast onClose={toggleShowB} show={showToast} animation={true} delay={5000} autohide>
            <Toast.Header>
              <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
              <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
              <small>{moment().fromNow()}</small>
            </Toast.Header>
            <Toast.Body>{applicationStatusMsg && <>{currentStudentInfo.applicationStatusMsg}</>}</Toast.Body>
          </Toast>
        </ToastContainer>
      </StudentTemplate>
    </div>
  )
}

export default StudentHomepage
