import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import moment from 'moment';
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import FacultyTemplate from "../../../components/FacultyTemplate";

const FacultyViewStudentDataID = () => {

    let navigate = useNavigate();
    let colorStatusRPD, msgWCD, msgPR, msgDateJoin, msgStatus, years;

    const [usernameStud, setUserNameStud] = useState();
    const [dateJoin, setDateJoin] = useState();
    const [degreeLvl, setDegreeLvl] = useState();
    const [academicStatus, setAcademicStatus] = useState();
    const [studentStatus, setStudentStatus] = useState();
    
    const [rpdStatus, setRpdStatus] = useState();
    const [prStatus, setPRStatus] = useState();
    const [wcdStatus, setWcdStatus] = useState();

    const [isPassedRPD, setIsPassedRPD] = useState();
    const [isPassedWCD, setIsPassedWCD] = useState();
    const [isPassedPR, setIsPassedPR] = useState();
    

    const { id } = useParams();

    const facultyLoginState = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLoginState;

    useEffect(() => {
        if (!facultyInfo) {
          navigate('/');
        }
    }, [navigate, facultyInfo]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`http://localhost:5000/api/faculty/facultyFetchDataStudent/${id}`);

            setUserNameStud(data.studID.usernameStud);
            setDateJoin(data.studID.dateJoin);
            setDegreeLvl(data.studID.degreeLvl);
            setAcademicStatus(data.studID.academicStatus);
            setStudentStatus(data.studID.isStudent);

            if (data.rpdID === null) {
                setRpdStatus("Record doesn't exist");
                setIsPassedRPD(false)
            } else if (data.rpdID.status === undefined) {
                setRpdStatus("Submitted, but the result is not yet evaluate by the authorities");
                setIsPassedRPD(false)
            } else {
                setRpdStatus(data.rpdID.status ?
                    "The student has passed the RPD"
                        :
                    "The student has failed the RPD"
                );

                if (data.rpdID.status === true) {
                    setIsPassedRPD(true)
                } else {
                    setIsPassedRPD(false)
                }
            }

            if (data.wcdID === null) {
                setWcdStatus("Record doesn't exist");
                setIsPassedWCD(false)
            } else if (data.wcdID.status === undefined) {
                setWcdStatus("Submitted, but the result is not yet evaluate by the authorities");
                setIsPassedWCD(false)
            } else {
                setWcdStatus(data.wcdID.status ?
                    "The student has passed the WCD"
                        :
                    "The student has failed the WCD"
                );

                if (data.wcdID.status === true) {
                    setIsPassedWCD(true)
                } else {
                    setIsPassedWCD(false)
                }
            }

            if (data.reportProgressID === null) {
                setPRStatus("NULL");
            } else {
                setPRStatus(data.reportProgressID.status ?
                    setIsPassedPR(true)
                    :
                    setIsPassedPR(false)
                );
            }

            if (data.reportProgressID === null) {
                setPRStatus("Record doesn't exist");
                setIsPassedPR(false)
            } else if (data.reportProgressID.status === undefined) {
                setPRStatus("The student has submitted the report, but the result is not yet evaluate by the authorities");
                setIsPassedPR(false)
            } else {
                setPRStatus(data.reportProgressID.status ?
                    "The student has passed the PR"
                        :
                    "The student has failed the PR"
                );

                if (data.reportProgressID.status === true) {
                    setIsPassedPR(true)
                } else {
                    setIsPassedPR(false)
                }
            }
            console.log(data);
        };
        fetching();
    }, [id]);

    console.log(isPassedRPD);

    // if (isPassedRPD ) {
    //     colorStatusRPD = <><span className="valid-msg">RPD Status: </span> 
    //     {`Student have passed his/her RPD`}</>;
    // } else {
    //     colorStatusRPD = <><span className="invalid-msg">RPD Status: </span> 
    //     {`Student have failed his/her RPD`}</>;
    // }

    // if (isPassedWCD) {
    //     msgWCD = <><span className="valid-msg">WCD Status: </span> 
    //     {`Student have passed his/her WCD`}</>;
    // } else {
    //     msgWCD = <><span className="invalid-msg">WCD Status: </span> 
    //     {`Student have failed his/her WCD`}</>;
    // }

    // if (isPassedPR) {
    //     msgPR = <><span className="valid-msg">PR Status: </span> 
    //     {`Student have passed his/her PR`}</>;
    // } else {
    //     msgPR = <><span className="invalid-msg">PR Status: </span> 
    //     {`Student have failed his/her PR`}</>;
    // }

    // Duration of Study
    switch(degreeLvl) {
        case 'Master Degree (Part-Time)':
            years = 3;
            break;
        case 'Master Degree (Full-Time)':
            years = 5;
            break;
        case 'Doctoral Degree (Part-Time)':
            years = 5;
            break;
        case 'Doctoral Degree (Full-Time)':
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

    return (
        <FacultyTemplate>
            <div className="form-title-desc-container">Details of The Student</div>
                <div className="row" style={{marginTop: '40px'}}>
                    <div className="col-5">
                    <Form className="form" enctype="multipart/form-data">
                        <div>
                            <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                                    <Form.Label column>Student Name</Form.Label>
                                    <Col sm={4}>
                                    <Form.Control
                                        type="text"
                                        placeholder="null"
                                        value={usernameStud}
                                        disabled
                                    />
                                    </Col>
                            </Form.Group>
                        </div>
                    </Form>
                    </div>
                    <div className="col instruction-box" style={{borderRadius: '5px'}}>
                        <div className="row" style={{marginTop: '20px'}}>
                            <div style={{borderRadius: '5px'}}>
                                <Table className="table-borderless mt-1" style={{fontFamily: 'Montserrat'}}>
                                        <thead>
                                            <tr>
                                                <th><i class="fa-solid fa-circle-info" style={{whiteSpace: "nowrap"}}> Analysis </i></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{msgDateJoin}</td>
                                        </tr>
                                        <tr>
                                            <td>{`RPD Status: ${rpdStatus}`}</td>
                                        </tr>
                                        <tr>
                                             <td>{`WCD Status: ${wcdStatus}`}</td>
                                        </tr>
                                        <tr>
                                            <td>{`PR Status: ${prStatus}`}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                
        </FacultyTemplate>
    )
}

export default FacultyViewStudentDataID;
