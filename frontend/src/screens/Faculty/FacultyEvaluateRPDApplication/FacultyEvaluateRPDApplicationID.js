import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { facultyUpdateApplication } from "../../../actions/facultyAction";
import { Form, Table, Button, Row, Col, Modal } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "../InputForm.css";
import "./FacultyEvaluateRPDApplication.css"

const FacultyEvaluateRPDApplicationID = () => {

    let navigate = useNavigate();
    let msgStudent, msgSupervisor, msgDegree, msgThesis, msgDate;
    let invalid = false, months, days;

    const [fullName, setFullName] = useState();
    const [supervisorName, setSupervisorName] = useState();
    const [academicStatus, setAcademicStatus] = useState();
    const [miniThesisTitle, setMiniThesisTitle] = useState();
    const [dateApplyRPD, setDateApplyRPD] = useState();
    const [dateScheduleRPD, setDateScheduleRPD] = useState();

    const [dateJoined, setDateJoined] = useState();
    const [usernameStud, setUsernameStud] = useState();
    const [degreeLvl, setDegreeLvl] = useState();
    const [supervisorUser, setUsernameSup] = useState();
    const [applicationStatus, setApplicationStatus] = useState();

    // Bootstrap Modal
    const [show, setShow] = useState(false); const handleShow = () => setShow(true); const handleClose = () => setShow(false);
    const [showb, setShowb] = useState(false); const handleShowb = () => setShowb(true); const handleCloseb = () => setShowb(false);
    const [showc, setShowc] = useState(false); const handleShowc = () => setShowc(true); const handleClosec = () => setShowc(false);
    const [showd, setShowd] = useState(false); const handleShowd = () => setShowd(true); const handleClosed = () => setShowd(false);
    const [showe, setShowe] = useState(false); const handleShowe = () => setShowe(true); const handleClosee = () => setShowe(false);
    

    const { id } = useParams();
    const dispatch =  useDispatch();

    const facultyLoginState = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLoginState;

    const RPDEvaluateState = useSelector((state) => state.facultyUpdateApplication);
    const { loading, error, successMsg } = RPDEvaluateState;

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
            setApplicationStatus(data.applicationStatus);

            setDateJoined(moment(data.studentUser.dateJoin).format('l'));
            setUsernameStud(data.studentUser.usernameStud); 
            setDegreeLvl(data.studentUser.degreeLvl); 
            setUsernameSup(data.studentUser.supervisorUser); 
        };
        fetching();
    }, [id]);

    useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/facultyEvaluateRPDApplication");
          }, 2000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successMsg])


    const approveApplication = () => {
        if (window.confirm("Are you sure to approve?")) {
            console.log("approve");
        }
    }

    const rejectApplication = () => {
        if (window.confirm("Are you sure to reject?")) {
            console.log("reject");
            dispatch(facultyUpdateApplication(id));
        }
    }

    if(fullName !== usernameStud) {
        msgStudent = <><span className="invalid-msg">Invalid: </span> 
            Student's name from the request form is not match with the student's name</>
        invalid = true;
    } else {
        msgStudent = <><span className="valid-msg">Valid: </span> 
            Student's name from the request form is match with the student's name</>
    }
    if(supervisorName !== supervisorUser) {
        msgSupervisor = <><span className="invalid-msg">Invalid: </span>
            Student's supervisor from the request form is not match with the student's supervisor</>
        invalid = true;
    } else {
        msgSupervisor = <><span className="valid-msg">Valid: </span>
            Student's supervisor from the request form is match with the student's supervisor</>
    }
    if(!miniThesisTitle) {
        msgThesis = <><span className="invalid-msg">Invalid: </span>
           Mini Thesis is not found</>;
        invalid = true;
    } else {
        msgThesis = <><span className="valid-msg">Valid: </span>
            Mini Thesis is found</>;
    }
    msgDegree = <><span className="valid-msg">Valid: </span>
        Degree level is valid</>;

    switch(degreeLvl) {
        case 'Master Degree (Part-Time)':
            days = 274; months = 9;
            break;
        case 'Master Degree (Full-Time)':
            days = 183; months = 6;
            break;
        case 'Doctoral Degree (Part-Time)':
            days = 365; months = 12;
            break;
        case 'Doctoral Degree (Full-Time)':
            days = 274; months = 9;
            break;
        default:
            days = null; months = null;
            break;
    }
    
    if(moment(dateApplyRPD, 'l') < moment(dateJoined,'l').add(days, 'days')) {
        msgDate = <><span className="valid-msg">Valid: </span>
           {`Application date is not more than ${months} months from the student joining-date`}</>;
    } else {
        msgDate = <><span className="invalid-msg">Invalid: </span>
            {`Application date is more than ${months} months from the student joining-date`}</>;
        invalid = true;
    }

    return (
        <FacultyTemplate>
            <div className="form-title-desc-container">Details of The Request Application</div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {successMsg && <SuccessMessage variant="success">{"The application has been rejected"}</SuccessMessage>}
            {loading && <Loading />}
                <div className="row" style={{marginTop: '40px'}}>
                    <div className="col-6 instruction-box" style={{borderRadius: '5px', height: 'fit-content'}}>
                        <Table className="table-borderless mt-4" style={{fontFamily: 'Montserrat'}}>
                            <thead>
                                <tr>
                                    <th><i className="fa-solid fa-triangle-exclamation" style={{color: 'red', whiteSpace: "nowrap"}}> Analysis </i></th>
                                </tr>
                                <tr style={{ backgroundColor: 'whitesmoke', color: '#4C4C4C', fontSize: '14px'}}>
                                    <th>{}</th>
                                    <th>Student's Application</th>
                                    <th>Student's Info</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                </tr>
                                <tr>
                                    <td>Student Name</td>
                                    <td>{fullName}</td>
                                    <td>{usernameStud}</td>
                                    <td>
                                        {fullName !== usernameStud && <i className="fa-solid fa-xmark" onClick={handleShow} style={{ cursor: 'pointer', color: 'red'}}></i>}
                                        {fullName === usernameStud && <i className="fa-solid fa-check" onClick={handleShow} style={{ cursor: 'pointer' }}></i>}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{whiteSpace: "nowrap"}}>Supervisor Name</td>
                                    <td>{supervisorName}</td>
                                    <td>{supervisorUser}</td>
                                    <td>
                                        {supervisorName !== supervisorUser && <i className="fa-solid fa-xmark" onClick={handleShowb} style={{ cursor: 'pointer', color: 'red' }}></i>}
                                        {supervisorName === supervisorUser && <i className="fa-solid fa-check" onClick={handleShowb} style={{ cursor: 'pointer' }}></i>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Degree Lvl</td>
                                    <td>{}</td>
                                    <td>{degreeLvl}</td>
                                    <td>{degreeLvl && <i class="fa-solid fa-check" onClick={handleShowd} style={{ cursor: 'pointer' }}></i>}</td>
                                </tr>
                                <tr>
                                    <td>Mini Thesis Title</td>
                                    <td>{miniThesisTitle}</td>
                                    <td>{}</td>
                                    <td>
                                        {!miniThesisTitle && <i className="fa-solid fa-xmark" onClick={handleShowc} style={{ cursor: 'pointer', color: 'red' }}></i>}
                                        { miniThesisTitle && <i className="fa-solid fa-check" onClick={handleShowc} style={{ cursor: 'pointer' }}></i>}
                                    </td>
                                </tr>
                                 <tr>
                                    <td style={{whiteSpace: "nowrap"}}>Date Joined</td>
                                    <td>{}</td>
                                    <td rowSpan={2}>{dateJoined}</td>
                                </tr>
                                <tr>
                                    <td>Application Date</td>
                                    <td colspan="2">{dateApplyRPD}</td>
                                    <td>
                                        {moment(dateApplyRPD, 'l') < moment(dateJoined,'l').add(days, 'days') 
                                            && <i className="fa-solid fa-check" onClick={handleShowe} style={{ cursor: 'pointer' }}></i>
                                        }
                                        {moment(dateApplyRPD, 'l') > moment(dateJoined,'l').add(days, 'days') 
                                            && <i className="fa-solid fa-exclamation" onClick={handleShowe} style={{ cursor: 'pointer', color: 'red' }}></i>
                                        }
                                    </td>
                                    {console.log(dateApplyRPD+","+moment(dateJoined).add(183, 'days').format('l'))}
                                </tr>
                            </tbody>
                        </Table>

                        <Table className="table-borderless mt-5" style={{fontFamily: 'Montserrat'}}>
                            <thead>
                                <tr>
                                    <th><i class="fa-solid fa-circle-info" style={{whiteSpace: "nowrap"}}> Result </i></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                </tr>
                                <tr>
                                    <td><><span>{msgStudent}</span></></td>
                                </tr>
                                <tr>
                                    <td>{msgSupervisor}</td>
                                </tr>
                                <tr>
                                    <td>{msgThesis}</td>
                                </tr>
                                <tr>
                                    <td>{msgDegree}</td>
                                </tr>
                                <tr>
                                    <td>{msgDate}</td>
                                </tr>
                            </tbody>
                        </Table>    


                        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                                <Modal.Title>Status: Student Name</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {msgStudent}
                            </Modal.Body>
                        </Modal>

                        <Modal show={showb} onHide={handleCloseb} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                                <Modal.Title>Status: Supervisor Name</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {msgSupervisor}
                            </Modal.Body>
                        </Modal>

                        <Modal show={showc} onHide={handleClosec} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                                <Modal.Title>Status: Mini Thesis Title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {msgThesis}
                            </Modal.Body>
                        </Modal>

                        <Modal show={showd} onHide={handleClosed} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                                <Modal.Title>Status: Degree Level</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {msgDegree}
                            </Modal.Body>
                        </Modal>

                        <Modal show={showe} onHide={handleClosee} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                            <Modal.Title>Status: RPD Application</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {msgDate}
                            </Modal.Body>
                        </Modal>
                        
                    </div>
                    <div className="col">
                        <Form className="form" style={{marginTop: 0, height: '59em'}}>
                            <i class="fa-solid fa-file mb-3" style={{whiteSpace: "nowrap", color: "#046dba"}}> Student Request Form </i>
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
                            {/* <Form.Group as={Row} className="mb-4"controlId="title">
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
                            </Form.Group> */}
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
                                <Form.Label column sm={2}>Schedule Date</Form.Label>
                                <Calendar
                                    value={dateScheduleRPD}
                                    onChange={setDateScheduleRPD}
                                    dateFormat="MMMM d, yyyy"
                                />
                            </Form.Group>
                            <Form.Group className="float-right">
                                <Row>
                                    {(invalid && applicationStatus != false) && <Col className="col-5"><small style={{color: 'red'}}>*Unable to approve the application due to one or more INVALID information is existed</small></Col>}
                                    {(invalid && applicationStatus != false) && <Col>
                                        <Button className="table-details-button mt-4 mr-4" variant="primary" disabled>
                                            Approve
                                        </Button> </Col>
                                    }
                                    {(invalid && applicationStatus != false) && <Col>
                                        <Button className="table-details-button mt-4" variant="primary" onClick={() => rejectApplication()} >
                                            Reject
                                        </Button></Col>
                                    }
                                    {(!invalid && applicationStatus != false) && <Col className="col-5"><small style={{color: 'red'}}>*Unable to reject the application due to all information is VALID</small></Col>}
                                    {(!invalid && applicationStatus != false) && <Col> 
                                        <Button className="table-details-button mt-4" variant="primary" onClick={() => approveApplication()}>
                                            Approve
                                        </Button></Col>
                                    }
                                    {(!invalid && applicationStatus != false) && <Col>
                                        <Button className="table-details-button mt-4" variant="primary" disabled>
                                            Reject
                                        </Button></Col>
                                    }
                                </Row>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
        </FacultyTemplate>
    )
}

export default FacultyEvaluateRPDApplicationID;
