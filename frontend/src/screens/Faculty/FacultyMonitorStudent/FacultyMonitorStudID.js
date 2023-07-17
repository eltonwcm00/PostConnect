import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { facultyTerminateStudent, facultyActiveStudent } from "../../../actions/facultyAction";
import moment from 'moment';
import { BASE_URL_2 } from "../../../urlPath";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "../InputForm.css";

const FacultyMonitorStudID = () => {

    let navigate = useNavigate();
    let msgDateJoin, msgStatus, years;

    const [usernameStud, setUserNameStud] = useState();
    const [dateJoin, setDateJoin] = useState();
    const [degreeLvl, setDegreeLvl] = useState();
    const [academicStatus, setAcademicStatus] = useState();
    const [studentStatus, setStudentStatus] = useState();
    const [rpdStatus, setRpdStatus] = useState();
    const [prStatus, setPRStatus] = useState();
    const [wcdStatus, setWcdStatus] = useState();

    const { id } = useParams();
    const dispatch =  useDispatch();

    const facultyLoginState = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLoginState;

    const studentTerminationState = useSelector((state) => state.facultyUpdateApplication);
    const { loading, error, successMsg, successApproveMsg } = studentTerminationState;

    useEffect(() => {
        if (!facultyInfo) {
          navigate('/');
        }
    }, [navigate, facultyInfo]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`${BASE_URL_2}api/faculty/facultyReadMonitorStudent/${id}`);

            setUserNameStud(data.usernameStud);
            setDateJoin(data.dateJoin);
            setDegreeLvl(data.degreeLvl);
            setAcademicStatus(data.academicStatus);
            setStudentStatus(data.isStudent);
            setRpdStatus(data.retryRPDAttempt || {});
            setPRStatus(data.retryPRAttempt || {});
            setWcdStatus(data.retryWCDAttempt || {});
        };
        fetching();
    }, [id]);

    switch(degreeLvl) {
        case 'Master Degree (Full-Time)':
            years = 3;
            break;
        case 'Master Degree (Part-Time)':
            years = 5;
            break;
        case 'Doctoral Degree (Full-Time)':
            years = 5;
            break;
        case 'Doctoral Degree (Part-Time)':
            years = 7;
            break;
        default:
            years = null;
            break;
    }

    var limitDate = moment(dateJoin).add(years , 'years'); 
    console.log(limitDate);

    if (moment() > moment(limitDate) && academicStatus === "Active") { 
        msgDateJoin = <><span className="invalid-msg">Duration Of The Study: </span> 
            {`Student's duration of studies had exceed the allowed max. duration (${years} years) of study`}</>
    } else {
        msgDateJoin = <><span className="valid-msg">Duration Of The Study: </span> 
            {`Student's duration of studies has not exceed the allowed max. duration (${years} years) of study`}</>
    }

    if(studentStatus === false) {

        var terminationCause;

        if (rpdStatus >= 3) {
            terminationCause = "Research Proposal Defence (RPD)";
        }
        else if (wcdStatus >= 3) {
          terminationCause = "Work Completion Defence (WCD)";
        }
        else if (prStatus >= 3) {
          terminationCause = "Progress Report (PR)";
        }

        msgStatus = <><span className="invalid-msg">Student Status: </span>
            {
                (rpdStatus >= 3 || wcdStatus >= 3 || prStatus >= 3) ? 
                `Terminated. Student is lack in the study performance. He/She has received 3 consecutive fail grade for ${terminationCause}. 
                 Hence, his/her has been terminated automatically by the system.`
                    : `Terminated. Student had exceed the allowed max. study duration (years) of study`
            } </>
    } else {
        msgStatus = <><span className="valid-msg">Student Status: </span>
            Active. Student is active in the program.</>
    }

    useEffect(() => {
        if (successMsg || successApproveMsg) {
          const timer = setTimeout(() => {
            navigate("/facultyMonitorStudent");
          }, 5000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successMsg, successApproveMsg])

    const terminateStudent = () => {
        if (window.confirm("Are you sure to terminate the student status?")) {
            console.log("terminate");
            dispatch(facultyTerminateStudent(id));
        }
    }

    const activateStudent = () => {
        if (window.confirm("Are you sure to re-active the student status?")) {
            console.log("activated");
            dispatch(facultyActiveStudent(id));
        }
    }

    return (
        <FacultyTemplate>
            <div className="form-title-desc-container">Details of The Student</div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {successMsg && <SuccessMessage variant="success">{"The student's status has been set to be 'Terminated'"}</SuccessMessage>}
            {successApproveMsg && <SuccessMessage variant="success">{"The student's status has been set to be 'Active'"}</SuccessMessage>}
            {loading && <Loading />}
                <div className="row" style={{marginTop: '40px'}}>
                    <div className="col-5 instruction-box" style={{borderRadius: '5px'}}>
                        <Table className="table-borderless" style={{fontFamily: 'Montserrat'}}>
                            <thead>
                                <tr>
                                    <th><i className="fa-solid fa-triangle-exclamation" style={{color: 'red', textTransform: 'uppercase'}}> Note </i></th>
                                </tr>
                                <tr>
                                    <th>Degree Lvl.</th>
                                    <th className="text-center" style={{whiteSpace: 'nowrap'}}>Max. Duration of Study (Years)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Master of Science (Information Technology) - Part-Time</td>
                                    <td className="text-center">3</td>
                                </tr>
                                <tr>
                                    <td>Master of Science (Information Technology) - Full-Time</td>
                                    <td className="text-center">5</td>
                                </tr>
                                <tr>
                                    <td>Doctor of Philosophy (Information Technology) - Part-Time</td>
                                    <td className="text-center">5</td>
                                </tr>
                                <tr>
                                    <td>Doctor of Philosophy (Information Technology) - Full-Time</td>
                                    <td className="text-center">7</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="row" style={{marginTop: '20px'}}>
                    <div style={{borderRadius: '5px'}}>
                        <Table className="table-borderless mt-1" style={{fontFamily: 'Montserrat'}}>
                                <thead>
                                    <tr>
                                        <th><i className="fa-solid fa-circle-info" style={{whiteSpace: "nowrap"}}> Analysis </i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{msgDateJoin}</td>
                                </tr>
                                <tr>
                                    <td>{msgStatus}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                    </div>
                    <div className="col">
                        <Form className="form" style={{marginTop: 0}}>
                            <Form.Group  className="mb-4" controlId="title">
                                <Form.Label>Student Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={usernameStud}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="title">
                                <Form.Label>Date Joined</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={moment(dateJoin).format('DD/MM/YYYY')}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="title">
                                <Form.Label>Degree Level</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={degreeLvl}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="title">
                                <Form.Label>Student Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={studentStatus ? "Active" : "Terminated"}
                                    disabled
                                />
                            </Form.Group>
                            <Row>
                                <Col sm={3}>
                                   <Button className="table-details-button mt-5" variant="primary" onClick={() => activateStudent()}>
                                       Re-activate
                                   </Button> 
                                </Col>
                                <Col>
                                    <Button className="table-details-button mt-5" variant="primary" onClick={() => terminateStudent()}>
                                        Terminate
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                
        </FacultyTemplate>
    )
}

export default FacultyMonitorStudID;
