import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { studentRPDRequest } from "../../../actions/studentAction";
import Loading from "../../../components/Loading";
import SuccessMessage from "../../../components/SuccessMessage";
import ErrorMessage from "../../../components/ErrorMessage";
import StudentTemplate from "../../../components/StudentTemplate";
import "./StudentRPDRequest.css";

const StudentRPDRequest = () => {

    let navigate = useNavigate();

    const [fullName, setfullName] = useState("");
    const [miniThesisTitle, setminiThesisTitle] = useState("");
    const [supervisorName, setsupervisorName] = useState("");
    const [miniThesisPDF, setminiThesisPDF] = useState("");

    const dispatch = useDispatch();

    const studentRPDRequestState = useSelector((state) => state.studentRPDRequest);
    const { loading, error, studentInfo, successMsg } = studentRPDRequestState;

    useEffect(() => {
        if (studentInfo) {
          navigate("/studentRequestRPD");
        }
    }, [navigate, studentInfo]);

    useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/studentHomepage");
          }, 2000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successMsg])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(studentRPDRequest(fullName, miniThesisTitle, supervisorName, miniThesisPDF));
    };
  

    return (
        <StudentTemplate>
            <div className="form-title-desc-container">Request Form</div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {successMsg && <SuccessMessage variant="success">{studentInfo.successMessage}</SuccessMessage>}
            {loading && <Loading />}

            <Form className="form" onSubmit={submitHandler}>
                <Form.Group as={Row} className="mb-5" controlId="formBasicEmail">
                    <Form.Label column sm={2}>Full Name*</Form.Label>
                    <Col sm={10} mb={3}>
                    <Form.Control
                        type="text"
                        value={fullName}
                        placeholder="Your fullname"
                        onChange={(e) => setfullName(e.target.value)}
                        className="py-4 input-request"
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Mini Thesis Title*</Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={miniThesisTitle}
                        placeholder="Your mini thesis title"
                        onChange={(e) => setminiThesisTitle(e.target.value)}
                        className="py-4 input-request"
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Supervisor Name*</Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={supervisorName}
                        placeholder="Your supervisor name"
                        onChange={(e) => setsupervisorName(e.target.value)}
                        className="py-4 input-request" 
                    />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Mini Thesis PDF</Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={miniThesisPDF}
                        placeholder="Your mini thesis file"
                        onChange={(e) => setminiThesisPDF(e.target.value)}
                        className="py-4 input-request"
                    />
                    </Col>
                </Form.Group>

                    <Button className=" mt-4 submit-btn" variant="primary" type="submit">
                        Submit 
                    </Button>
            </Form>
        </StudentTemplate> 
    );
}

export default StudentRPDRequest
