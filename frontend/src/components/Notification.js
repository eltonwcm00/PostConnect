import React, { useEffect, useState } from "react";
import moment from 'moment';
import axios from "axios";
import { Toast, ToastContainer, Tab, Tabs } from 'react-bootstrap';
import { CDBContainer, CDBTable, CDBTableBody } from 'cdbreact';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_2 } from "../urlPath";
import { studentApplicationStatus, studentApplicationStatus2, studentApplicationStatus3, studentMeetingLogStatus } from "../actions/studentAction";
import "./Notification.css"

const Notification = () => {
  
  let navigate = useNavigate();
  let monthReminder = 0;

  const [degreeLvl, setDegreeLvl] = useState();

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

  const { token } = useSelector((state) => state.studentLogin.studentInfo || {});

  useEffect(() => {
    dispatch(studentApplicationStatus());
    dispatch(studentApplicationStatus2());
    dispatch(studentApplicationStatus3());
    dispatch(studentMeetingLogStatus());
  
    if (!studentInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, studentInfo]);

  useEffect(() => {
    const fetching = async () => {
            
      if (token) {
         const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
         }; 
         const { data } = await axios.get(`${BASE_URL_2}api/student/studentViewOwnProfile`, config);
         setDegreeLvl(data.fetchCurrentStudent.degreeLvl);
      }
    };
    fetching();
  }, [token])

  switch(degreeLvl) {
    case 'Master Degree (Part-Time)':
        monthReminder = 33; //max = 36months - 3 months (prior reminder for candidature extension)
        break;
    case 'Master Degree (Full-Time)':
        monthReminder = 57; //60
        break;
    case 'Doctoral Degree (Part-Time)':
        monthReminder = 57; //60
        break;
    case 'Doctoral Degree (Full-Time)':
        monthReminder = 81; //84
        break;
    default:
        monthReminder = null;
        break;
  }
  console.log(degreeLvl)
  if (studentInfo) {
    var limitDate = moment(studentInfo.dateJoined).add(monthReminder, 'months');
    console.log(limitDate);
    console.log(monthReminder)
    console.log(studentInfo.dateJoined)
  }

  const maxWidthNotif = {
    width: '75vw', 
    left: '50%', 
    backgroundColor: 'white' 
  }

  return (
    <>
      <h4 className="mb-3 toast-title">Notifications</h4>
      <Tabs defaultActiveKey="ResearchProposalDefence" id="fill-tab-example" className="mb-3 tab mt-4" justify transition={false}>
        { 
        (moment() > limitDate) &&
          <Tab eventKey="Duration of Study" title="Duration of Study">
            <CDBContainer style={{padding: '20px 0', textAlign: "center"}}>
              <CDBTable borderless>
                <CDBTableBody>
                  <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                    <Toast className="toast" onClose={toggleShowA} show={showToast} animation={true} style={maxWidthNotif}>
                      <Toast.Header>
                        <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                        {studentInfo && <strong className="me-auto">{`Hi, ${studentInfo.usernameStud}`}</strong>}
                        <small>{moment().fromNow()}</small>
                      </Toast.Header>
                      <Toast.Body>
                        {`Please be advised that you are approaching the maximum duration of study permitted for your program. 
                          You have a remaining period of 3 months before your student status is set to expire. 
                          We kindly request that you contact the faculty to initiate the process of extending your candidature duration.` }
                      </Toast.Body>
                    </Toast>
                  </ToastContainer>
                </CDBTableBody>
              </CDBTable>
            </CDBContainer>
          </Tab>
        }
        <Tab eventKey="ResearchProposalDefence" title="Research Proposal Defence">
          <CDBContainer style={{padding: '20px 0', textAlign: "center"}}>
            <CDBTable borderless>
              <CDBTableBody>
              <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                {/* Remind student he/she about to be terminated from study if fail RPD more than 3 consecutive times */}
                {          
                  (studentInfo && studentInfo.retryRPDAttempt == 2) && 
                  <>
                    <Toast className="toast" onClose={toggleShowC} show={showToastC} animation={true} style={maxWidthNotif}>
                      <Toast.Header>
                      <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                        <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                        <small>{moment().fromNow()}</small>
                      </Toast.Header>
                      <Toast.Body>
                        {"Warning!, you have failed your RPD for 2 consecutive times, fail for the 3rd consective times will result in student status's termination"}
                      </Toast.Body>
                    </Toast>
                    <Toast className="toast" onClose={toggleShowC} show={showToastC} animation={true} style={{ width: '75vw', left: '50%', backgroundColor: 'white' }}>
                      <Toast.Header>
                      <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                        <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                        <small>{ applicationStatusMsg && moment(currentApplicationInfo.updatedAt).format('MMMM Do YYYY')}</small>
                      </Toast.Header>
                      <Toast.Body>
                        {"Sorry, You have received a 'Unsatisfactory (US)' grade and failed your RPD, please re-apply the RPD"}
                      </Toast.Body>
                    </Toast>
                  </>
                }
                <Toast className="toast" onClose={toggleShowA} show={showToast} animation={true} style={maxWidthNotif}>
                  <Toast.Header>
                    <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                    {studentInfo && <strong className="me-auto">{`Hi, ${studentInfo.usernameStud}`}</strong>}
                    {
                    studentInfo && studentInfo.retryRPDAttempt == 2 ? 
                      <small>{applicationStatusMsg && moment(currentApplicationInfo.updatedAt2).format('MMMM Do YYYY')}</small>
                      : 
                      <small>{applicationStatusMsg && moment(currentApplicationInfo.updatedAt).format('MMMM Do YYYY')}</small>
                    }
                  </Toast.Header>
                  <Toast.Body>{applicationStatusMsg && <>{currentApplicationInfo.applicationStatusMsg}</>}</Toast.Body>
                </Toast>
              </ToastContainer>
              </CDBTableBody>
            </CDBTable>
          </CDBContainer>
        </Tab>
        <Tab eventKey="WorkCompletionDefence" title="Work Completion Defence">
          <CDBContainer style={{padding: '10px 0', textAlign: "center"}}>
            <CDBTable borderless>
              <CDBTableBody>
              <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                 {/* Remind student he/she about to be terminated from study if fail WCD more than 3 consecutive times */}
                 {
                    (studentInfo && studentInfo.retryWCDAttempt == 2) && 
                    <>
                      <Toast className="toast" onClose={toggleShowE} show={showToastE} animation={true} style={maxWidthNotif}>
                        <Toast.Header className="toast-header">
                        <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                          <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                          <small>{moment().fromNow()}</small>
                        </Toast.Header>
                        <Toast.Body>
                          {"Warning!, you have failed your WCD for 2 consecutive times, fail for the 3rd consective times will result in student status's termination"}
                        </Toast.Body>
                      </Toast>
                      <Toast className="toast" onClose={toggleShowE} show={showToastE} animation={true} style={maxWidthNotif}>
                        <Toast.Header>
                        <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                          <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                          <small>{ applicationStatusMsg2 && moment(currentApplicationInfo2.updatedAt).format('MMMM Do YYYY')}</small>
                        </Toast.Header>
                        <Toast.Body>
                          {"Sorry, You have received a 'Unsatisfactory (US)' grade and failed your WCD, please re-apply the RPD"}
                        </Toast.Body>
                      </Toast>
                    </>
                  }
                <Toast className="toast" onClose={toggleShowD} show={showToastD} animation={true} style={maxWidthNotif}>
                  <Toast.Header className="toast-header">
                    <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                    {studentInfo && <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>}
                    {
                      studentInfo && studentInfo.retryWCDAttempt == 2 ? 
                        <small>{applicationStatusMsg2 && moment(currentApplicationInfo2.updatedAt2).format('MMMM Do YYYY')}</small>
                        :
                        <small>{applicationStatusMsg2 && moment(currentApplicationInfo2.updatedAt).format('MMMM Do YYYY')}</small>
                    }
                  </Toast.Header>
                  <Toast.Body>{applicationStatusMsg2 && <>{currentApplicationInfo2.applicationStatusMsg}</>}</Toast.Body>
                </Toast>
              </ToastContainer>
              </CDBTableBody>
            </CDBTable>
          </CDBContainer>
        </Tab>
        <Tab eventKey="ProgressReport" title="Progress Report">
          <CDBContainer style={{padding: '10px 0px', textAlign: "center"}}>
            <CDBTable borderless>
              <CDBTableBody>
              <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                {/* Remind student he/she about to be terminated from study if fail PR more than 3 consecutive times */}
                {
                  (studentInfo && studentInfo.retryPRAttempt == 2) && 
                  <>
                    <Toast className="toast" onClose={toggleShowE} show={showToastE} animation={true} style={maxWidthNotif}>
                      <Toast.Header className="toast-header">
                      <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                        <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                        <small>{moment().fromNow()}</small>
                      </Toast.Header>
                      <Toast.Body>
                        {"Warning!, you have failed your PR for 2 consecutive times, fail for the 3rd consective times will result in student status's termination"}
                      </Toast.Body>
                    </Toast>
                    <Toast className="toast" onClose={toggleShowE} show={showToastE} animation={true} style={maxWidthNotif}>
                      <Toast.Header>
                        <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                        <strong className="me-auto">{studentInfo && `Hi, ${studentInfo.usernameStud}`}</strong>
                        <small>{applicationStatusMsg3 && moment(currentApplicationInfo3.updatedAt).format('MMMM Do YYYY')}</small>
                        <small className="ml-2" style={{fontWeight: 'bold', fontStyle: 'italic'}}>(Cycle#2)</small>
                      </Toast.Header>
                      <Toast.Body>
                        {`Your progress report has been evaluated. Sorry, you received grade 'Unsatisfactory' (US).`}
                      </Toast.Body>
                    </Toast>
                  </>
                  }
                <Toast className="toast" onClose={toggleShowF} show={showToastF} animation={true} style={maxWidthNotif}>
                  <Toast.Header className="toast-header">
                    <img src="/image/student.png" className="rounded me-2" alt="null" style={{height: 20}} />
                    {studentInfo && <strong className="me-auto">{`Hi, ${studentInfo.usernameStud}`}</strong>}
                    {
                    studentInfo && studentInfo.retryPRAttempt == 2 ? 
                      <><small>{applicationStatusMsg3 && moment(currentApplicationInfo3.updatedAt2).format('MMMM Do YYYY')}</small>
                      <small className="ml-2" style={{fontWeight: 'bold', fontStyle: 'italic'}}>(Cycle#1)</small></>
                      : 
                      <><small>{applicationStatusMsg3 && moment(currentApplicationInfo3.updatedAt).format('MMMM Do YYYY')}</small>
                      <small className="ml-2" style={{fontWeight: 'bold', fontStyle: 'italic'}}>(Cycle#1)</small></>
                    }
                  </Toast.Header>
                  <Toast.Body>{applicationStatusMsg3 && <>{currentApplicationInfo3.applicationStatusMsg}</>}</Toast.Body>
                </Toast>
              </ToastContainer>
              </CDBTableBody>
            </CDBTable>
          </CDBContainer>
        </Tab>
        <Tab eventKey="MeetingLog" title="Meeting Log">
          <CDBContainer style={{padding: '10px 0px', textAlign: "center"}}>
            <CDBTable borderless>
              <CDBTableBody>
              <ToastContainer className="p-5 toast-container notification" position={rpdToastPosition}>
                <Toast className="toast" onClose={toggleShowB} show={showToastB} animation={true} style={maxWidthNotif}>
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
