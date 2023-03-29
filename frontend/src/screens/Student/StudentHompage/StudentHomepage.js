import React, { useEffect, useState } from "react";
import moment from 'moment';
import StudentTemplate from "../../../components/StudentTemplate";
import { Toast, ToastContainer } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { studentApplicationStatus, studentMeetingLogStatus } from "../../../actions/studentAction";

const StudentHomepage = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [rpdToastPosition, setRPDToastPosition] = useState('top-end');
  const [showToast, setShowToast] = useState(true);
  const [showToastB, setShowToastB] = useState(true);

  const toggleShowA = () => setShowToast(!showToast);
  const toggleShowB = () => setShowToastB(!showToastB);

    
  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentApplicationStatusState = useSelector((state) => state.studentApplicationStatus);
  const { currentStudentInfo, applicationStatusMsg, meetingLogStatusMsg } = studentApplicationStatusState;

  const fetchItems = () => async dispatch => {
    try {
      dispatch(studentApplicationStatus());
      dispatch(studentMeetingLogStatus())
    } catch (error) {
        console.log(error);
    }
  }

  // useEffect(() => {
  
  //   dispatch(studentApplicationStatus());
  //     if (!studentInfo) {
  //       navigate("/");
  //     }
  //   // dispatch(fetchItems())
  // }, [currentStudentInfo]);

  useEffect(() => {
    dispatch(studentApplicationStatus());
    dispatch(studentMeetingLogStatus());
  }, [currentStudentInfo ])

  return (
    <div>
      <StudentTemplate>
        <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
        <ToastContainer className="p-5" position={rpdToastPosition}>
          <Toast onClose={toggleShowA} show={showToast} animation={true}>
            <Toast.Header>
              <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
              <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
              <small>{moment().fromNow()}</small>
            </Toast.Header>
            <Toast.Body>{applicationStatusMsg && <>{currentStudentInfo.applicationStatusMsg}</>}</Toast.Body>
          </Toast>
          <Toast onClose={toggleShowB} show={showToastB} animation={true}>
            <Toast.Header>
            <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
              <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
              <small>{moment().fromNow()}</small>
            </Toast.Header>
            <Toast.Body>{meetingLogStatusMsg && <>{currentStudentInfo.meetingLogStatusMsg}</>}</Toast.Body>
          </Toast>
        </ToastContainer>
      </StudentTemplate>
    </div>
  )
}

export default StudentHomepage
