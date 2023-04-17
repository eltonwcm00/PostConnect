import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { studentPRLandingPage, studentPRRegister } from "../../../actions/studentAction";
import { Form, Button, Row, Col } from "react-bootstrap";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import StudentTemplate from "../../../components/StudentTemplate";
import "./StudentSubmitPR.css";

const StudentSubmitPR = () => {

    let navigate = useNavigate(), textColor;
    const dispatch =  useDispatch();

    const studentLoginState = useSelector((state) => state.studentLogin);
    const { studentInfo } = studentLoginState;

    const prLandingState = useSelector((state) => state.studentPRLandingPage);
    const { landingMsgStatus, landingMsg } = prLandingState;

    const prRegisterState = useSelector((state) => state.studentCWRequest);
    const { applicationInfo, successMsg, error } = prRegisterState

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

  return (
    <StudentTemplate>
        {successMsg && <SuccessMessage variant="success">{applicationInfo.messagePRSucess}</SuccessMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <div className="row pr-main-container">
          <div className="col-7 pr-sub-container-left">
            <h3 className="mb-3">Registration For Progress Report Submission</h3>
            <hr/>
            {landingMsgStatus && <>{landingMsg.date ? `The date of progress report submission is set to be at : ` 
              :landingMsg.prDate}</>}
            {landingMsgStatus && (landingMsg.date && 
              <>
                <div className="row pr-date color"><q>{landingMsg.date}</q></div>
                <div className="row pr-date" style={{marginLeft: '2px'}}>Kindly proceed with the registration and submit before the due date</div>
                <Button className='table-details-button mt-4' onClick={registerHandler}>Register</Button>
              </>)}
          </div>
          <div className="col">
            2 of 2
          </div>
        </div>
   
    </StudentTemplate>
  )
}

export default StudentSubmitPR
