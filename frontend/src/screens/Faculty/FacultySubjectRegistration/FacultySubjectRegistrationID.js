import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";

const FacultySubjectRegistrationID = () => {
    
    const facultyLogin = useSelector((state) => state.facultyLogin);
  const { facultyInfo } = facultyLogin;

    const studentListUpdate = useSelector((state) => state.facultyUpdateChooseStudent);
    const { successMsg, fetchStudent, error2 } = studentListUpdate;

    const [subjectA, setSubjectA] = useState("");
    const [subjectB, setSubjectB] = useState("");
    
    const subjectSelectionA = (e) => {
        setSubjectA(e.target.checked);
    };

    const subjectSelectionB = (e) => {
        setSubjectB(e.target.checked);
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        if(subjectA && subjectB) {
            console.log("Subject A and Subject B is selected");
        }
        else if(subjectA) {
            console.log("Subject A is selected");
        }
        else if(subjectB) {
            console.log("Subject B is selected");
        }
        else {
            console.log("No subject is selected")
        }
    }
  
    return (
        <FacultyTemplate>
        <div className="form-title-desc-container">Assign Passed Subject</div>
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
