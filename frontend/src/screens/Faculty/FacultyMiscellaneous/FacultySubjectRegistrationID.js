import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { facultyUpdateSubjectStudent } from "../../../actions/facultyAction";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";

const FacultySubjectRegistrationID = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const facultyLogin = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLogin;

    const studentSubjectUpdate = useSelector((state) => state.facultyUpdateChooseStudent);
    const { successMsg, fetchStudent, error2 } = studentSubjectUpdate;

    const [subjectA, setSubjectA] = useState(null);
    const [subjectB, setSubjectB] = useState(null);
    
    const subjectSelectionA = (e) => {
        setSubjectA(e.target.checked);
    };

    const subjectSelectionB = (e) => {
        setSubjectB(e.target.checked);
    };

    useEffect(() => {
        if (!facultyInfo) {
          navigate('/');
        }
    }, [navigate, facultyInfo]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(facultyUpdateSubjectStudent(id, subjectA, subjectB))
    }

    useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/facultySubjectRegistration");
          }, 5000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successMsg])
  
    return (
        <FacultyTemplate>
        <div className="form-title-desc-container">Assign Passed Subject</div>
            {error2 && <ErrorMessage variant="danger">{fetchStudent.failMessage}</ErrorMessage>}
            {successMsg && <SuccessMessage variant="success">{fetchStudent.successMessage}</SuccessMessage>}
            <Form>
                <Row className="justify-content-md-center" style={{textAlign: 'center'}}>
                    <Col md="8">
                        <div className="mt-5">
                            <Form.Check
                                inline
                                label="Data Structure and Algorithm"
                                name="group1"
                                type="checkbox"
                                id="inline-checkbox-1"
                                checked={subjectA}
                                onChange={subjectSelectionA}
                            />
                            <Form.Check
                                inline
                                label="Web App Development with MERN Stack"
                                name="group1"
                                type="checkbox"
                                id="inline-checkbox-2"
                                checked={subjectB}
                                onChange={subjectSelectionB}
                            />
                        </div>
                    </Col>           
                </Row>
                <Row>
                    <Button style={{margin: '0 auto'}} className=" mt-4 submit-btn" variant="primary" type="submit" onClick={submitHandler}>
                        Pass 
                    </Button>
                </Row>
            </Form>
        </FacultyTemplate>
  )
}

export default FacultySubjectRegistrationID
