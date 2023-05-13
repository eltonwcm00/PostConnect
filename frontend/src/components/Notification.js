import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Toast, ToastContainer, Tab, Tabs, Row, Col } from 'react-bootstrap';
import { CDBContainer, CDBTable, CDBTableBody } from 'cdbreact';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentApplicationStatus, studentApplicationStatus2, studentApplicationStatus3, studentMeetingLogStatus } from "../actions/studentAction";
import "./Notification.css"
import Clock from "./Clock";

const Notification = () => {
  
  let navigate = useNavigate();

  const [rpdToastPosition, setRPDToastPosition] = useState('top-start');
  const [showToast, setShowToast] = useState(true);
  const [showToastB, setShowToastB] = useState(true);
  const [showToastC, setShowToastC] = useState(true);
  const [showToastD, setShowToastD] = useState(true);
  const [showToastE, setShowToastE] = useState(true);
  const [showToastF, setShowToastF] = useState(true);
  
  const dispatch = useDispatch();

  const toggleShowA = () => setShowToast(!showToast);
  const toggleShowB = () => setShowToastB(!showToastB);
  const toggleShowC = () => setShowToastC(!showToastC);
  const toggleShowD = () => setShowToastD(!showToastD);
  const toggleShowE = () => setShowToastE(!showToastE);
  const toggleShowF = () => setShowToastF(!showToastF);

  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentApplicationStatusState = useSelector((state) => state.studentApplicationStatus);
  const { applicationStatusMsg, currentApplicationInfo } = studentApplicationStatusState;
  const studentApplicationStatusState2 = useSelector((state) => state.studentApplicationStatus2);
  const { applicationStatusMsg2, currentApplicationInfo2 } = studentApplicationStatusState2;
  const studentApplicationStatusState3 = useSelector((state) => state.studentApplicationStatus3);
  const { applicationStatusMsg3, currentApplicationInfo3 } = studentApplicationStatusState3;
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
    dispatch(studentApplicationStatus3());
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
      <>
        <h4 className="mb-3 toast-title">Notifications</h4>
        <Tabs defaultActiveKey="ResearchProposalDefence" id="fill-tab-example" className="mb-3 tab mt-4" justify transition={false}>
        <Tab eventKey="ResearchProposalDefence" title="Research Proposal Defence">
          <CDBContainer style={{padding: '20px 0', textAlign: "center"}} className="list-container">
            <CDBTable borderless>
              <CDBTableBody>
              <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                <Toast className="toast" onClose={toggleShowA} show={showToast} animation={true}>
                  <Toast.Header>
                    <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                    <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                    <small>{applicationStatusMsg && moment(currentApplicationInfo.updatedAt).format('MMMM Do YYYY')}</small>
                  </Toast.Header>
                  <Toast.Body>{applicationStatusMsg && <>{currentApplicationInfo.applicationStatusMsg}</>}</Toast.Body>
                </Toast>
                {/* Remind student he/she about to be terminated from study if fail RPD more than 3 consecutive times */}
                {          
                  (studentInfo && studentInfo.retryRPDAttempt == 2) && 
                    <Toast className="toast" onClose={toggleShowC} show={showToastC} animation={true}>
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
              </ToastContainer>
              </CDBTableBody>
            </CDBTable>
          </CDBContainer>
        </Tab>
        <Tab eventKey="WorkCompletionDefence" title="Work Completion Defence">
          <CDBContainer style={{padding: '10px 0', textAlign: "center"}} className="list-container">
            <CDBTable borderless>
              <CDBTableBody>
              <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                <Toast className="toast" onClose={toggleShowD} show={showToastD} animation={true}>
                  <Toast.Header className="toast-header">
                    <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                    <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                    <small>{applicationStatusMsg2 && moment(currentApplicationInfo2.updatedAt).format('MMMM Do YYYY')}</small>
                  </Toast.Header>
                  <Toast.Body>{applicationStatusMsg2 && <>{currentApplicationInfo2.applicationStatusMsg}</>}</Toast.Body>
                </Toast>
                  {/* Remind student he/she about to be terminated from study if fail WCD more than 3 consecutive times */}
                  {
                    (studentInfo && studentInfo.retryWCDAttempt == 2) && 
                      <Toast className="toast" onClose={toggleShowE} show={showToastE} animation={true}>
                        <Toast.Header className="toast-header">
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
              </CDBTableBody>
            </CDBTable>
          </CDBContainer>
        </Tab>
        <Tab eventKey="ProgressReport" title="Progress Report">
          <CDBContainer style={{padding: '10px 0px', textAlign: "center"}} className="list-container">
            <CDBTable borderless>
              <CDBTableBody>
              <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                <Toast className="toast" onClose={toggleShowF} show={showToastF} animation={true}>
                  <Toast.Header className="toast-header">
                    <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                    <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                    <small>{applicationStatusMsg3 && moment(currentApplicationInfo3.updatedAt).format('MMMM Do YYYY')}</small>
                  </Toast.Header>
                  <Toast.Body>{applicationStatusMsg3 && <>{currentApplicationInfo3.applicationStatusMsg}</>}</Toast.Body>
                </Toast>
                {/* Remind student he/she about to be terminated from study if fail WCD more than 3 consecutive times */}
                {
                    (studentInfo && studentInfo.retryPRAttempt == 2) && 
                      <Toast className="toast" onClose={toggleShowE} show={showToastE} animation={true}>
                        <Toast.Header className="toast-header">
                        <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                          <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                          <small>{moment().fromNow()}</small>
                        </Toast.Header>
                        <Toast.Body>
                          {"Warning!, you have failed your PR for 2 consecutive times, fail for the 3rd consective times will result in student status's termination"}
                        </Toast.Body>
                      </Toast>
                  }
              </ToastContainer>
              </CDBTableBody>
            </CDBTable>
          </CDBContainer>
        </Tab>
        <Tab eventKey="MeetingLog" title="Meeting Log">
          <CDBContainer style={{padding: '10px 0px', textAlign: "center"}} className="list-container">
            <CDBTable borderless>
              <CDBTableBody>
              <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                <Toast className="toast" onClose={toggleShowB} show={showToastB} animation={true}>
                  <Toast.Header>
                  <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                    <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                    <small>{meetingLogStatusMsg && moment(currentMeetingInfo.updatedAt).format('MMMM Do YYYY')}</small>
                  </Toast.Header>
                  <Toast.Body>{meetingLogStatusMsg && <>{currentMeetingInfo.meetingLogStatusMsg}</>}</Toast.Body>
                </Toast>
              </ToastContainer>
              </CDBTableBody>
            </CDBTable>
          </CDBContainer>
        </Tab>
      </Tabs>
      </>    
    )
}

export default Notification
