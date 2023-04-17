import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { studentPRLandingPage, studentRegisterPR } from "../../../actions/studentAction";
import { Form, Table, Button, Row, Col, Modal } from "react-bootstrap";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import StudentTemplate from "../../../components/StudentTemplate";

const StudentSubmitPR = () => {

    let navigate = useNavigate();
    const dispatch =  useDispatch();

    const studentLoginState = useSelector((state) => state.studentLogin);
    const { studentInfo } = studentLoginState;

    const prLandingState = useSelector((state) => state.studentPRLandingPage);
    const { landingMsgStatus, landingMsg } = prLandingState;

    useEffect(() => {
        if (!studentInfo) {
          navigate('/');
        }
        else {
          dispatch(studentPRLandingPage());
        }
    }, [navigate, studentInfo]);
  
  return (
    <StudentTemplate>
      
        <div className="row">
          <div className="col-7">
            {landingMsgStatus && <>{landingMsg.prDate}</>}
          </div>
          <div className="col">
            2 of 2
          </div>
        </div>
   
    </StudentTemplate>
  )
}

export default StudentSubmitPR
