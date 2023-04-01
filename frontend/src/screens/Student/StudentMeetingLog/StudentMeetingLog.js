import React, { useState, useEffect } from "react";
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { studentSubmitMeetingLog } from "../../../actions/studentAction";
import Loading from "../../../components/Loading";
import SuccessMessage from "../../../components/SuccessMessage";
import ErrorMessage from "../../../components/ErrorMessage";
import StudentTemplate from "../../../components/StudentTemplate";
// import "./StudentMeetingLog.css";

const StudentMeetingLog = () => {

    let navigate = useNavigate();

    const [contentLog, setContentLog] = useState("");
    
    const dispatch = useDispatch();

    const studentLoginState = useSelector((state) => state.studentLogin);
    const { studentInfo } = studentLoginState;
    const studentCWRequestState = useSelector((state) => state.studentCWRequest);
    const { loading, error, applicationInfo, successMsg } = studentCWRequestState;

    useEffect(() => {
        if (studentInfo) {
          navigate("/studentSubmitMeetingLog");
        }
        else {
            navigate("/");
          }
    }, [navigate, studentInfo]);

    useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/studentHomepage");
          }, 5000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successMsg])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(studentSubmitMeetingLog(contentLog));
    };

    return (
        <StudentTemplate>
            <div className="form-title-desc-container">Meeting Log Form</div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {successMsg && <SuccessMessage variant="success">{applicationInfo.sucessMessage}</SuccessMessage>}
            {loading && <Loading />}
            <Form className="form" onSubmit={submitHandler} enctype="multipart/form-data">
                <Form.Group as={Row}  controlId="formBasicEmail">
                    <Form.Label column sm={2} style={{marginTop: -5}}>Today's Date</Form.Label>
                    <Col sm={10} mb={3}>
                        <small>{moment().format('l')}</small>
                    </Col>
                    <Form.Label column sm={2}>Decription*</Form.Label>
                    <Col sm={10} mb={3}>
                        <Form.Control as="textarea" rows={3} value={contentLog}
                            placeholder="Briefly describe what you have done since the past meeting"
                            onChange={(e) => setContentLog(e.target.value)}
                            className="py-4 input-request"/>
                    </Col>
                </Form.Group>
                <Button className=" mt-4 submit-btn" variant="primary" type="submit">
                    Submit 
                </Button>
            </Form>
        </StudentTemplate> 
    );
}

export default StudentMeetingLog
