import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { studentPRLandingPage, studentPRRegister, studentRPDReadRequest, studentPRSubmit } from "../../../actions/studentAction";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import StudentTemplate from "../../../components/StudentTemplate";
import "./StudentSubmitPR.css";

const StudentSubmitPR = () => {

    let navigate = useNavigate();
    const dispatch =  useDispatch();

    const [fullName, setfullName] = useState();
    const [supervisorName, setsupervisorName] = useState();
    const [contentPR, setContentPR] = useState("");

    const studentLoginState = useSelector((state) => state.studentLogin);
    const { studentInfo } = studentLoginState;

    const prLandingState = useSelector((state) => state.studentPRLandingPage);
    const { landingMsgStatus, landingMsg } = prLandingState;

    const studentCWReadRequestState = useSelector((state) => state.studentCWReadRequest);
    const {loadingStudentCW, studentCW, errorStudentCW } = studentCWReadRequestState;

    const prRegisterState = useSelector((state) => state.studentCWRequest);
    const { applicationInfo, successMsg, error } = prRegisterState;

    const prSubmitState = useSelector((state) => state.studentPRSubmit);
    const { loadingPR, studentPR, successStudentPR, errorStudentPR, failedStudentPR } = prSubmitState;

    useEffect(() => {
        if (!studentInfo) {
          navigate('/');
        }
        else {
          dispatch(studentPRLandingPage());
        }
    }, [navigate, studentInfo]);

    const registerHandler = () => {
      dispatch(studentPRRegister())
    }

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(studentPRSubmit(contentPR))
    }

    useEffect(() => {
      if (successMsg) {
        const timer = setTimeout(() => {
          navigate("/studentHomepage");
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [navigate, successMsg])

    useEffect(() => {
      dispatch(studentRPDReadRequest());
    }, []);

  return (
    <StudentTemplate>
        {successMsg && <SuccessMessage variant="success">{applicationInfo.messagePRSucess}</SuccessMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <div className="pr-main-container">
          <div className="pr-sub-container-left">
          {loadingPR && <Loading /> }
          {successStudentPR && <SuccessMessage variant="success">{studentPR.messagePRSubmittedSucess}</SuccessMessage>}
          {failedStudentPR && <ErrorMessage variant="danger">{errorStudentPR}</ErrorMessage>}
            <h3 className="mb-3">Progress Report Submission</h3>
            <hr/>
            {
              landingMsgStatus && 
                <>
                  {landingMsg.date ? `The due date of progress report submission is set to be at : ` 
                    :landingMsg.prDate}
                </>
            }
            {
              landingMsgStatus && (landingMsg.date && 
                <>
                  <div className="row pr-date color"><q>{landingMsg.date}</q></div>
                  {
                    landingMsgStatus && ((!landingMsg.registeredPR) ?  
                      <>
                        <div className="row pr-date" style={{marginLeft: '2px'}}>Kindly proceed with the registration and submit before the due date</div>
                        <Button className='table-details-button mt-4' onClick={registerHandler}>Register</Button>
                      </>
                      : 
                      <> 
                        {loadingStudentCW && <Loading /> }
                        {errorStudentCW && <ErrorMessage variant="danger">{errorStudentCW}</ErrorMessage>}
                
                        <Form className="pr-form" onSubmit={submitHandler} enctype="multipart/form-data">
                        {
                          studentCW && studentCW.map((sCW) => (
                            <div>
                              <Form.Group as={Row} className="mb-5 pr-desc" controlId="formBasicEmail">
                                  <Form.Label column sm={2}>Full Name*</Form.Label>
                                  <Col sm={10} mb={3}>
                                  <Form.Control
                                      type="text"
                                      value={sCW.usernameStud}
                                      placeholder="Your fullname"
                                      onChange={(e) => setfullName(e.target.value)}
                                      className="py-4 input-request"
                                      disabled
                                  />
                                  </Col>
                              </Form.Group>
                              <Form.Group as={Row} className="mb-5 pr-desc" controlId="formBasicPassword">
                                  <Form.Label column sm={2}>Supervisor Name*</Form.Label>
                                  <Col sm={10}>
                                  <Form.Control
                                      type="text"
                                      // value={supervisorName}
                                      value={sCW.supervisorUser}
                                      placeholder="Your supervisor name"
                                      onChange={(e) => setsupervisorName(e.target.value)}
                                      className="py-4 input-request"
                                      disabled
                                  />
                                  </Col>
                              </Form.Group>
                            </div>
                          ))
                        }
                            <Form.Group as={Row} className="mb-5 pr-desc" controlId="formBasicPassword">
                              <Form.Label column sm={2}>Progress Report</Form.Label>
                              <Col sm={10}>
                              <Form.Control
                                  type="file"
                                  value={contentPR}
                                  name="myFile"
                                  placeholder="Your progress report"
                                  onChange={(e) => setContentPR(e.target.value)}
                                  className="py-4 input-request"
                              />
                              </Col>
                            </Form.Group>

                          <Button className=" mt-4 submit-btn" variant="primary" type="submit">
                            Submit 
                          </Button>
                        </Form>
                      </>
                    )
                  }
                </>)
            }
          </div>
            
        </div>
   
    </StudentTemplate>
  )
}

export default StudentSubmitPR
