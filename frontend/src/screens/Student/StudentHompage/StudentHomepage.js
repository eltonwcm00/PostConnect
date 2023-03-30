import React, { useEffect, useState } from "react";
import moment from 'moment';
import StudentTemplate from "../../../components/StudentTemplate";
import { Toast, ToastContainer } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentApplicationStatus, studentMeetingLogStatus } from "../../../actions/studentAction";
import './StudentHomepage.css';

const StudentHomepage = () => {

  let navigate = useNavigate();

  const [rpdToastPosition, setRPDToastPosition] = useState('top-end');
  const [showToast, setShowToast] = useState(true);
  const [showToastB, setShowToastB] = useState(true);
  const [dateJoin, setDateJoin] = useState(new Date());
  
  const dispatch = useDispatch();

  const toggleShowA = () => setShowToast(!showToast);
  const toggleShowB = () => setShowToastB(!showToastB);

    
  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentApplicationStatusState = useSelector((state) => state.studentApplicationStatus);
  const { applicationStatusMsg, currentApplicationInfo } = studentApplicationStatusState;
  const studentMeetingLogStatusState = useSelector((state) => state.studentMeetingLogStatus);
  const {  meetingLogStatusMsg, currentMeetingInfo } = studentMeetingLogStatusState;

  useEffect(() => {
    dispatch(studentApplicationStatus());
    if (!studentInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, studentInfo]);

  useEffect(() => {
    dispatch(studentMeetingLogStatus());
    if (!studentInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, studentInfo])

  return (
    <StudentTemplate>
      <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
      <ToastContainer className="p-5 toast-container" position={rpdToastPosition}>
        <h3 className="toast-notification" style={{marginBottom: 30}}>Notification</h3>
        <Toast onClose={toggleShowA} show={showToast} animation={true}>
          <Toast.Header>
            <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
            <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
            <small>{moment().fromNow()}</small>
          </Toast.Header>
          <Toast.Body>{applicationStatusMsg && <>{currentApplicationInfo.applicationStatusMsg}</>}</Toast.Body>
        </Toast>
        <Toast onClose={toggleShowB} show={showToastB} animation={true}>
          <Toast.Header>
          <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
            <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
            <small>{moment().fromNow()}</small>
          </Toast.Header>
          <Toast.Body>{meetingLogStatusMsg && <>{currentMeetingInfo.meetingLogStatusMsg}</>}</Toast.Body>
        </Toast>
      </ToastContainer>
    </StudentTemplate>
  )
}

export default StudentHomepage
