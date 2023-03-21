import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "../InputForm.css";

const FacultyEvaluateRPDApplicationID = () => {

    let navigate = useNavigate();

    const [fullName, setFullName] = useState();
    const [supervisorName, setSupervisorName] = useState();
    const [academicStatus, setAcademicStatus] = useState();
    const [miniThesisTitle, setMiniThesisTitle] = useState();
    const [dateApplyRPD, setDateApplyRPD] = useState();
    const [dateScheduleRPD, setDateScheduleRPD] = useState();

    const [dateJoined, setDateJoined] = useState();
    const [usernameStud, setUsernameStud] = useState();
    const [supervisorUser, setUsernameSup] = useState();



    const { id } = useParams();
    // const dispatch =  useDispatch();

    const facultyLoginState = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLoginState;

    useEffect(() => {
        if (!facultyInfo) {
          navigate('/');
        }
    }, [navigate, facultyInfo]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`http://localhost:5000/api/faculty/facultyReadEvaluateRPDApplication/${id}`);

            setFullName(data.fullName);
            setSupervisorName(data.supervisorName); 
            setAcademicStatus(data.applicationStatus);
            setMiniThesisTitle(data.miniThesisTitle);
            setDateApplyRPD(moment(data.dateApplyRPD).format('l'));

            setDateJoined(moment(data.studentUser.dateJoin).format('l'));
            setUsernameStud(data.studentUser.usernameStud); 
            setUsernameSup(data.studentUser.supervisorUser);

        };
        fetching();
    }, [id]);

    return (
        <FacultyTemplate>
            <div className="form-title-desc-container">Details of The Request Application</div>
                <div className="row" style={{marginTop: '40px'}}>
                    <div className="col-6 instruction-box" style={{borderRadius: '5px', height: '25em'}}>
                        <Table className="table-borderless" style={{fontFamily: 'Montserrat'}}>
                            <thead>
                                <tr>
                                    <th><i className="fa-solid fa-triangle-exclamation" style={{color: 'red', textTransform: 'uppercase', whiteSpace: "nowrap"}}> Smart Checklist </i></th>
                                </tr>
                                <tr>
                                    <th>{}</th>
                                    <th>Student's Application</th>
                                    <th>Student's Info</th>
                                    <th>Validation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Student Name</td>
                                    <td>{fullName}</td>
                                    <td>{usernameStud}</td>
                                    <td>{fullName !== usernameStud ? "Fail" : "Pass"}</td>
                                </tr>
                                <tr>
                                    <td style={{whiteSpace: "nowrap"}}>Supervisor Name</td>
                                    <td>{supervisorName}</td>
                                    <td>{supervisorUser}</td>
                                    <td>{supervisorName !== supervisorUser ? "Fail" : "Pass"}</td>
                                </tr>
                                <tr>
                                    <td>Mini Thesis Title</td>
                                    <td>{miniThesisTitle}</td>
                                </tr>
                                 <tr>
                                    <td style={{whiteSpace: "nowrap"}}>Date Joined</td>
                                    <td>{}</td>
                                    <td rowSpan={2}>{dateJoined}</td>
                                </tr>
                                <tr>
                                    <td>Application Date</td>
                                    <td colspan="2">{dateApplyRPD}</td>
                                    <td>{dateJoined < dateApplyRPD ? "Pass" : "Fail"}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="col">
                        <Form className="form" style={{marginTop: 0}}>
                            <Form.Group as={Row} className="mb-5" controlId="title">
                                <Form.Label column sm={2}>Full Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="null"
                                        value={fullName}
                                        disabled
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5" controlId="title">
                                <Form.Label column sm={2}>Date Joined</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="null"
                                        value={dateJoined}
                                        disabled
                                        onChange={(e) => setDateJoined(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-4"controlId="title">
                                <Form.Label column sm={2}>Academic Status</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="null"
                                        value={academicStatus}
                                        disabled
                                        onChange={(e) => setAcademicStatus(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-4"controlId="title">
                                <Form.Label column sm={2}>Mini Thesis Title</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="null"
                                        value={miniThesisTitle}
                                        disabled
                                        onChange={(e) => setMiniThesisTitle(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-4"controlId="title">
                                <Form.Label column sm={2}>Application Date</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="null"
                                        value={dateApplyRPD}
                                        disabled
                                        onChange={(e) => setDateApplyRPD(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
                                <Form.Label column sm={2}>Date Join</Form.Label>
                                <Calendar
                                    value={dateScheduleRPD}
                                    onChange={setDateScheduleRPD}
                                    dateFormat="MMMM d, yyyy"
                                />
                            </Form.Group>
                            <Button className=" mt-4 float-right" variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
        </FacultyTemplate>
    )
}

export default FacultyEvaluateRPDApplicationID;
