import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Form, Table, Button } from "react-bootstrap";
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
    const [dateJoined, setDateJoined] = useState();
    const [academicStatus, setAcademicStatus] = useState();
    const [miniThesisTitle, setMiniThesisTitle] = useState();
    const [dateApplyRPD, setDateApplyRPD] = useState();
    const [dateScheduleRPD, setDateScheduleRPD] = useState();

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
            setDateJoined(moment(data.studentUser.dateJoin).format('l')); 
            setAcademicStatus(data.applicationStatus);
            setMiniThesisTitle(data.miniThesisTitle);
            setDateApplyRPD(moment(data.dateApplyRPD).format('l'));
        };
        fetching();
    }, [id]);

    return (
        <FacultyTemplate>
            <div className="form-title-desc-container">Details of The Request Application</div>
                <div className="row" style={{marginTop: '40px'}}>
                    <div className="col-5 instruction-box" style={{borderRadius: '5px'}}>
                        <Table className="table-borderless" style={{fontFamily: 'Montserrat'}}>
                            <thead>
                                <tr>
                                    <th><i className="fa-solid fa-triangle-exclamation" style={{color: 'red', textTransform: 'uppercase'}}> Note </i></th>
                                </tr>
                                <tr>
                                    <th>Position</th>
                                    <th className="text-center" >Max. Supervision Allowed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Principal Lecturer</td>
                                    <td className="text-center">6</td>
                                </tr>
                                <tr>
                                    <td>Senior Lecturer</td>
                                    <td className="text-center">5</td>
                                </tr>
                                <tr>
                                    <td>Lecturer</td>
                                    <td className="text-center">3</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="col">
                        <Form className="form" style={{marginTop: 0}}>
                            <Form.Group  className="mb-4" controlId="title">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={fullName}
                                    disabled
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="title">
                                <Form.Label>Date Joined</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={dateJoined}
                                    disabled
                                    onChange={(e) => setDateJoined(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4"controlId="title">
                                <Form.Label>Academic Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={academicStatus}
                                    disabled
                                    onChange={(e) => setAcademicStatus(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4"controlId="title">
                                <Form.Label>Mini Thesis Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={miniThesisTitle}
                                    disabled
                                    onChange={(e) => setMiniThesisTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4"controlId="title">
                                <Form.Label>Application Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="null"
                                    value={dateApplyRPD}
                                    disabled
                                    onChange={(e) => setDateApplyRPD(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                <Form.Label>Date Join</Form.Label>
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
