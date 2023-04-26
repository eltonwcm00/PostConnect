import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { studentRPDReadRequest, studentWCDRequest } from "../../../actions/studentAction";
import Loading from "../../../components/Loading";
import SuccessMessage from "../../../components/SuccessMessage";
import ErrorMessage from "../../../components/ErrorMessage";
import StudentTemplate from "../../../components/StudentTemplate";

const StudentWCDRequest = () => {

    let navigate = useNavigate();

    const [fullName, setfullName] = useState();
    const [thesisTitle, setThesisTitle] = useState("");
    const [supervisorName, setsupervisorName] = useState();
    const [thesisPDF, setThesisPDF] = useState("");

    const dispatch = useDispatch();

    const studentLoginState = useSelector((state) => state.studentLogin);
    const { studentInfo } = studentLoginState;
    const studentCWReadRequestState = useSelector((state) => state.studentCWReadRequest);
    const {loadingStudentCW, studentCW, errorStudentCW } = studentCWReadRequestState;
    const studentCWRequestState = useSelector((state) => state.studentCWRequest);
    const { loading, error, applicationInfo, successMsg } = studentCWRequestState;

    useEffect(() => {
        if (studentInfo) {
          navigate("/studentRequestWCD");
        }
        else {
          navigate("/");
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
        dispatch(studentWCDRequest(fullName, thesisTitle, supervisorName, thesisPDF));
        console.log(thesisPDF)
    };

    useEffect(() => {
       dispatch(studentRPDReadRequest());
    }, []);

    return (
        <StudentTemplate>
            <div className="form-title-desc-container">Request Form</div>
            {console.log(studentCW)}
            {loadingStudentCW && <Loading /> }
            {errorStudentCW && <ErrorMessage variant="danger">{errorStudentCW}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {successMsg && <SuccessMessage variant="success">{applicationInfo.successMessage}</SuccessMessage>}
            {loading && <Loading />}
            <Form className="form" onSubmit={submitHandler} enctype="multipart/form-data">
                {
                    studentCW && studentCW.map((sCW) => (
                        <div>
                            <Form.Group as={Row} className="mb-5" controlId="formBasicEmail">
                                <Form.Label column sm={2}>Full Name*</Form.Label>
                                <Col sm={10} mb={3}>
                                <Form.Control
                                    type="text"
                                    value={sCW.usernameStud}
                                    placeholder="null"
                                    onChange={(e) => setfullName(e.target.value)}
                                    className="py-4 input-request"
                                    disabled
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                                <Form.Label column sm={2}>Supervisor Name*</Form.Label>
                                <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    // value={supervisorName}
                                    // value={sCW.supervisorUser.usernameSup}
                                    value={sCW.supervisorUser}
                                    optional
                                    placeholder="null"
                                    onChange={(e) => setsupervisorName(e.target.value)}
                                    className="py-4 input-request"
                                    disabled
                                />
                                </Col>
                            </Form.Group>
                        </div>
                    ))
                }
                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Full Thesis Title*</Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={thesisTitle}
                        placeholder="Your full thesis title"
                        onChange={(e) => setThesisTitle(e.target.value)}
                        className="py-4 input-request"
                        id="myFile" 
                        name="myFile"
                    />
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Full Thesis PDF</Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="file"
                        value={thesisPDF}
                        name="myFile"
                        placeholder="Your full thesis file"
                        onChange={(e) => setThesisPDF(e.target.value)}
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

export default StudentWCDRequest
