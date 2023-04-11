import React, { useEffect, useState } from "react";
import moment from 'moment';
import StudentTemplate from "../../../components/StudentTemplate";
import { Toast, ToastContainer } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentApplicationStatus, studentApplicationStatus2, studentMeetingLogStatus } from "../../../actions/studentAction";
import './StudentHomepage.css';

const StudentHomepage = () => {

  let navigate = useNavigate();

  const [rpdToastPosition, setRPDToastPosition] = useState('top-end');
  const [showToast, setShowToast] = useState(true);
  const [showToastB, setShowToastB] = useState(true);
  const [showToastC, setShowToastC] = useState(true);
  const [showToastD, setShowToastD] = useState(true);
  const [showToastE, setShowToastE] = useState(true);
  const [dateJoin, setDateJoin] = useState(new Date());
  
  const dispatch = useDispatch();

  const toggleShowA = () => setShowToast(!showToast);
  const toggleShowB = () => setShowToastB(!showToastB);
  const toggleShowC = () => setShowToastC(!showToastC);
  const toggleShowD = () => setShowToastD(!showToastD);
  const toggleShowE = () => setShowToastE(!showToastE);

  
  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentApplicationStatusState = useSelector((state) => state.studentApplicationStatus);
  const { applicationStatusMsg, currentApplicationInfo } = studentApplicationStatusState;
  const studentApplicationStatusState2 = useSelector((state) => state.studentApplicationStatus2);
  const { applicationStatusMsg2, currentApplicationInfo2 } = studentApplicationStatusState2;
  const studentMeetingLogStatusState = useSelector((state) => state.studentMeetingLogStatus);
  const {  meetingLogStatusMsg, currentMeetingInfo } = studentMeetingLogStatusState;

  useEffect(() => {
    dispatch(studentApplicationStatus());
    if (!studentInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, studentInfo]);

  useEffect(() => {
    dispatch(studentApplicationStatus2());
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
        <h3 className="toast-notification" style={{marginBottom: 30}}>Annoucement</h3>
        <Toast onClose={toggleShowA} show={showToast} animation={true}>
          <Toast.Header>
            <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
            <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
            <small>{moment().fromNow()}</small>
          </Toast.Header>
          <Toast.Body>{applicationStatusMsg && <>{currentApplicationInfo.applicationStatusMsg}</>}</Toast.Body>
        </Toast>

        <Toast onClose={toggleShowD} show={showToastD} animation={true}>
          <Toast.Header>
            <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
            <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
            <small>{moment().fromNow()}</small>
          </Toast.Header>
          <Toast.Body>{applicationStatusMsg2 && <>{currentApplicationInfo2.applicationStatusMsg}</>}</Toast.Body>
        </Toast>

        <Toast onClose={toggleShowB} show={showToastB} animation={true}>
          <Toast.Header>
          <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
            <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
            <small>{moment().fromNow()}</small>
          </Toast.Header>
          <Toast.Body>{meetingLogStatusMsg && <>{currentMeetingInfo.meetingLogStatusMsg}</>}</Toast.Body>
        </Toast>

        {/* Remind student he/she about to be terminated from study if fail more than 3 consecutive times */}
        {
          (studentInfo && studentInfo.retryRPDAttempt == 2) && 
            <Toast onClose={toggleShowC} show={showToastC} animation={true}>
              <Toast.Header>
              <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                <small>{moment().fromNow()}</small>
              </Toast.Header>
              <Toast.Body>
                {"Warning!, you have failed your RPD for 2 consecutive times, fail for the 3rd consective times will result in student status's termination"}
              </Toast.Body>
            </Toast>
        }
        {
          (studentInfo && studentInfo.retryWCDAttempt == 2) && 
            <Toast onClose={toggleShowE} show={showToastE} animation={true}>
              <Toast.Header>
              <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                <small>{moment().fromNow()}</small>
              </Toast.Header>
              <Toast.Body>
                {"Warning!, you have failed your WCD for 2 consecutive times, fail for the 3rd consective times will result in student status's termination"}
              </Toast.Body>
            </Toast>
        }
      </ToastContainer>
    </StudentTemplate>
  )
}

export default StudentHomepage
