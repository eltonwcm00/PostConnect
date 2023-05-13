import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { facultyRejectWCDApplication, facultyApproveWCDApplication } from "../../../actions/facultyAction";
import { Form, Table, Button, Row, Col, Modal } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "../InputForm.css";
// import "./FacultyEvaluateRPDApplication.css"

const FacultyEvaluateWCDApplicationID = () => {

    let navigate = useNavigate();
    let msgStudent, msgSupervisor, msgDegree, msgThesis, msgDate, passedSubjectA, passedSubjectB, passedStudRPD;
    let invalid = false, months, days;

    // request form
    const [fullName, setFullName] = useState();
    const [supervisorName, setSupervisorName] = useState();
    const [academicStatus, setAcademicStatus] = useState();
    const [thesisTitle, setThesisTitle] = useState();
    const [dateApplyWCD, setDateApplyWCD] = useState();
    const [dateScheduleWCD, setDateScheduleWCD] = useState();

    // analysis
    const [dateJoined, setDateJoined] = useState();
    const [usernameStud, setUsernameStud] = useState();
    const [degreeLvl, setDegreeLvl] = useState();
    const [supervisorUser, setUsernameSup] = useState();
    const [applicationStatus, setApplicationStatus] = useState();
    const [passedSubA, setPassedSubA] = useState();
    const [passedSubB, setPassedSubB] = useState();
    const [passedRPD, setPassedRPD] = useState();

    // Bootstrap Modal
    const [show, setShow] = useState(false); const handleShow = () => setShow(true); const handleClose = () => setShow(false);
    const [showb, setShowb] = useState(false); const handleShowb = () => setShowb(true); const handleCloseb = () => setShowb(false);
    const [showc, setShowc] = useState(false); const handleShowc = () => setShowc(true); const handleClosec = () => setShowc(false);
    const [showd, setShowd] = useState(false); const handleShowd = () => setShowd(true); const handleClosed = () => setShowd(false);
    const [showe, setShowe] = useState(false); const handleShowe = () => setShowe(true); const handleClosee = () => setShowe(false);
    const [showf, setShowf] = useState(false); const handleShowf = () => setShowf(true); const handleClosef = () => setShowf(false);
    const [showg, setShowg] = useState(false); const handleShowg = () => setShowg(true); const handleCloseg = () => setShowg(false);
    const [showh, setShowh] = useState(false); const handleShowh = () => setShowh(true); const handleCloseh = () => setShowh(false);

    const { id } = useParams();
    const dispatch =  useDispatch();

    const facultyLoginState = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLoginState;

    const RPDEvaluateState = useSelector((state) => state.facultyUpdateApplication);
    const { loading, error, successMsg, successApproveMsg } = RPDEvaluateState;

    useEffect(() => {
        if (!facultyInfo) {
          navigate('/');
        }
    }, [navigate, facultyInfo]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`http://localhost:5000/api/faculty/facultyReadEvaluateWCDApplication/${id}`);

            setFullName(data.fullName);
            setSupervisorName(data.supervisorName); 
            setAcademicStatus(data.applicationStatus);
            setThesisTitle(data.thesisTitle);
            setDateApplyWCD(moment(data.dateApplyWCD).format('l'));
            setApplicationStatus(data.applicationStatus);

            setDateJoined(moment(data.studentUser.dateJoin).format('l'));
            setUsernameStud(data.studentUser.usernameStud); 
            setDegreeLvl(data.studentUser.degreeLvl); 
            setUsernameSup(data.studentUser.supervisorUser); 
            setPassedSubA(data.studentUser.subjectA);
            setPassedSubB(data.studentUser.subjectB);
            setPassedRPD(data.studentUser.retryRPDAttempt);

            console.log(data);
        };
        fetching();
    }, [id]);

    useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/facultyEvaluateWCDApplication");
          }, 2000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successMsg])


    const approveApplication = () => {
        if (window.confirm("Are you sure to approve?")) {
            console.log("approve");
            dispatch(facultyApproveWCDApplication(id, dateScheduleWCD))
        }
    }

    const rejectApplication = () => {
        if (window.confirm("Are you sure to reject?")) {
            console.log("reject");
            dispatch(facultyRejectWCDApplication(id));
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
    if(!thesisTitle) {
        msgThesis = <><span className="invalid-msg">Invalid: </span>
           Full Thesis is not found</>;
        invalid = true;
    } else {
        msgThesis = <><span className="valid-msg">Valid: </span>
            Full Thesis is found</>;
    }
    msgDegree = <><span className="valid-msg">Valid: </span>
        Degree level is valid</>;
    if(!passedSubA) {
        passedSubjectA = <><span className="invalid-msg">Invalid: </span>
            Student's subject A is not pass</>
        invalid = true;
    } else {
        passedSubjectA = <><span className="valid-msg">Valid: </span>
            Student's subject A is passed</>
    }
    if(!passedSubB) {
        passedSubjectB = <><span className="invalid-msg">Invalid: </span>
            Student's subject B is not pass</>
        invalid = true;
    } else {
        passedSubjectB = <><span className="valid-msg">Valid: </span>
            Student's subject B is passed</>
    }
    if(passedRPD > 0) {
        passedStudRPD = <><span className="invalid-msg">Invalid: </span>
             Student's RPD is failed</>
        invalid = true;
    } else {
        passedStudRPD = <><span className="valid-msg">Valid: </span>
             Student's RPD is passed</>
    }

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
    
    if(moment(dateApplyWCD, 'l') < moment(dateJoined,'l').add(days, 'days')) {
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
            {successApproveMsg && <SuccessMessage variant="success">{"The application has been approve"}</SuccessMessage>}
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
                                    <td>{degreeLvl && <i className="fa-solid fa-check" onClick={handleShowd} style={{ cursor: 'pointer' }}></i>}</td>
                                </tr>
                                <tr>
                                    <td>Mini Thesis Title</td>
                                    <td>{thesisTitle}</td>
                                    <td>{}</td>
                                    <td>
                                        {!thesisTitle && <i className="fa-solid fa-xmark" onClick={handleShowc} style={{ cursor: 'pointer', color: 'red' }}></i>}
                                        { thesisTitle && <i className="fa-solid fa-check" onClick={handleShowc} style={{ cursor: 'pointer' }}></i>}
                                    </td>
                                </tr>
                                 <tr>
                                    <td style={{whiteSpace: "nowrap"}}>Date Joined</td>
                                    <td>{}</td>
                                    <td rowSpan={2}>{dateJoined}</td>
                                </tr>
                                <tr>
                                    <td>Application Date</td>
                                    <td colSpan="2">{dateApplyWCD}</td>
                                    <td>
                                        {moment(dateApplyWCD, 'l') < moment(dateJoined,'l').add(days, 'days') 
                                            && <i className="fa-solid fa-check" onClick={handleShowe} style={{ cursor: 'pointer' }}></i>
                                        }
                                        {moment(dateApplyWCD, 'l') > moment(dateJoined,'l').add(days, 'days') 
                                            && <i className="fa-solid fa-exclamation" onClick={handleShowe} style={{ cursor: 'pointer', color: 'red' }}></i>
                                        }
                                    </td>
                                    {console.log(dateApplyWCD+","+moment(dateJoined).add(183, 'days').format('l'))}
                                </tr>
                                <tr>
                                    <td>Subject A</td>
                                    <td>{}</td>
                                    <td>{!passedSubA ? "Failed" : "Passed"}</td>
                                    <td>
                                        {!passedSubA && <i className="fa-solid fa-xmark" onClick={handleShowf} style={{ cursor: 'pointer', color: 'red' }}></i>}
                                        { passedSubA && <i className="fa-solid fa-check" onClick={handleShowf} style={{ cursor: 'pointer' }}></i>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Subject B</td>
                                    <td>{}</td>
                                    <td>{!passedSubB ? "Failed" : "Passed"}</td>
                                    <td>
                                        {!passedSubB && <i className="fa-solid fa-xmark" onClick={handleShowg} style={{ cursor: 'pointer', color: 'red' }}></i>}
                                        { passedSubB && <i className="fa-solid fa-check" onClick={handleShowg} style={{ cursor: 'pointer' }}></i>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Research Proposal Def.</td>
                                    <td>{}</td>
                                    <td>{passedRPD > 0 ? "Failed" : "Passed"}</td>
                                    <td>
                                        {passedRPD > 0 ? <i className="fa-solid fa-xmark" onClick={handleShowh} style={{ cursor: 'pointer', color: 'red' }}></i> : <i className="fa-solid fa-check" onClick={handleShowh} style={{ cursor: 'pointer' }}></i> }
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <Table className="table-borderless mt-5" style={{fontFamily: 'Montserrat'}}>
                            <thead>
                                <tr>
                                    <th><i className="fa-solid fa-circle-info" style={{whiteSpace: "nowrap"}}> Result </i></th>
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
                                <tr>
                                    <td>{passedSubjectA}</td>
                                </tr>
                                <tr>
                                    <td>{passedSubjectB}</td>
                                </tr>
                                <tr>
                                    <td>{passedStudRPD}</td>
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
                                <Modal.Title>Status: Full Thesis Title</Modal.Title>
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
                            <Modal.Title>Status: WCD Application</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {msgDate}
                            </Modal.Body>
                        </Modal>

                        <Modal show={showf} onHide={handleClosef} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                            <Modal.Title>Status: Subject A</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {passedSubjectA}
                            </Modal.Body>
                        </Modal>
                        
                        <Modal show={showg} onHide={handleCloseg} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                            <Modal.Title>Status: Subject B</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {passedSubjectB}
                            </Modal.Body>
                        </Modal>

                        <Modal show={showh} onHide={handleCloseh} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                            <Modal.Title>Status: Research Proposal Defence</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {passedStudRPD}
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className="col">
                        <Form className="form" style={{marginTop: 0, height: '59em'}}>
                            <i className="fa-solid fa-file mb-3" style={{whiteSpace: "nowrap", color: "#046dba"}}> Student Request Form </i>
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
                                <Form.Label column sm={2}>Full Thesis Title</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="null"
                                        value={thesisTitle}
                                        disabled
                                        onChange={(e) => setThesisTitle(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-4"controlId="title">
                                <Form.Label column sm={2}>Application Date</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="null"
                                        value={dateApplyWCD}
                                        disabled
                                        onChange={(e) => setDateApplyWCD(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            {(!invalid && (applicationStatus !== false && applicationStatus !== true)) && <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
                                <Form.Label column sm={2}>Schedule Date</Form.Label>
                                <Calendar
                                    value={dateScheduleWCD}
                                    onChange={setDateScheduleWCD}
                                    dateFormat="MMMM d, yyyy"
                                />
                            </Form.Group>}
                            <Form.Group className="float-right">
                                <Row>
                                    {(invalid && (applicationStatus !== false && applicationStatus !== true)) && <Col className="col-5"><small style={{color: 'red'}}>*Unable to approve the application due to one or more INVALID information is existed</small></Col>}
                                    {(invalid && (applicationStatus !== false && applicationStatus !== true)) && <Col>
                                        <Button className="table-details-button mt-4 mr-4" variant="primary" disabled>
                                            Approve
                                        </Button> </Col>
                                    }
                                    {(invalid && (applicationStatus !== false && applicationStatus !== true)) && <Col>
                                        <Button className="table-details-button mt-4" variant="primary" onClick={() => rejectApplication()} >
                                            Reject
                                        </Button></Col>
                                    }
                                    {(!invalid && (applicationStatus !== false && applicationStatus !== true)) && <Col className="col-5"><small style={{color: 'red'}}>*Unable to reject the application due to all information is VALID</small></Col>}
                                    {(!invalid && (applicationStatus !== false && applicationStatus !== true)) && <Col> 
                                        <Button className="table-details-button mt-4" variant="primary" onClick={() => approveApplication()}>
                                            Approve
                                        </Button></Col>
                                    }
                                    {(!invalid && (applicationStatus !== false && applicationStatus !== true)) && <Col>
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

export default FacultyEvaluateWCDApplicationID;
