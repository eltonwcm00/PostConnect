import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { facultySetPRDate } from "../../../actions/facultyAction";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";

const FacultySetPRDate = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const facultyLogin = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLogin;

    const facultySetPRDateState = useSelector((state) => state.facultySetPR);
    const { prDateInfo, successMsg, error } = facultySetPRDateState;

    const [dateSetPR, setPRDate] = useState(null);
    
    useEffect(() => {
        if (!facultyInfo) {
          navigate('/');
        }
    }, [navigate, facultyInfo]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(facultySetPRDate(dateSetPR))
    }

    useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/facultyHomepage");
          }, 5000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successMsg])
  
    return (
        <>
            <div className="form-title-desc-container">Set Date Of Progress Report Presentation</div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {successMsg && <SuccessMessage variant="success">{prDateInfo.messagePRSucess}</SuccessMessage>}
            <Form>
                <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
                    <Form.Label column sm={2}o>Date</Form.Label>
                    <Col sm={10}>
                    <Calendar
                        value={dateSetPR}
                        onChange={setPRDate}
                        dateFormat="MMMM d, yyyy"
                    />
                    </Col>
                </Form.Group>
                <Row>
                    <Button style={{margin: '0 auto'}} className=" mt-4 submit-btn" variant="primary" type="submit" onClick={submitHandler}>
                        Submit 
                    </Button>
                </Row>
            </Form>
        </>
    )
}

export default FacultySetPRDate