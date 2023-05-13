import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import moment from 'moment';
import { Table, Button, Row, Col, Tab, Tabs } from "react-bootstrap";
import { CDBContainer, CDBTable, CDBTableHeader, CDBTableBody } from 'cdbreact';
import FacultyTemplate from "../../../components/FacultyTemplate";

const FacultyViewStudentDataID = () => {

    let navigate = useNavigate();
    let index, msgDateJoin, msgStatus, years;

    const [pastCurrentDataRPD, setPastCurrentDataRPD] = useState([]);
    const [pastCurrentDataWCD, setPastCurrentDataWCD] = useState([]);
    const [pastCurrentDataPR, setPastCurrentDataPR] = useState([]);

    const [usernameStud, setUserNameStud] = useState();
    const [supervisor, setSupervisor] = useState();
    const [dateJoin, setDateJoin] = useState();
    const [degreeLvl, setDegreeLvl] = useState();
    const [academicStatus, setAcademicStatus] = useState();
    const [studentStatus, setStudentStatus] = useState();
    const [rpdRetry, setRpdRetry] = useState(0);
    const [prRetry, setPRRetry] = useState(0);
    const [wcdRetry, setWcdRetry] = useState(0);
    
    const [rpdStatus, setRpdStatus] = useState();
    const [prStatus, setPRStatus] = useState();
    const [wcdStatus, setWcdStatus] = useState();
    const [isPassedRPD, setIsPassedRPD] = useState(false);
    const [isPassedWCD, setIsPassedWCD] = useState(false);
    const [isPassedPR, setIsPassedPR] = useState(false);

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
            setSupervisor(data.supID ? data.supID.usernameSup : 'Not yet been assigned to any supervisor' )
            setDateJoin(data.studID.dateJoin);
            setDegreeLvl(data.studID.degreeLvl);
            setAcademicStatus(data.studID.academicStatus);
            setRpdRetry(data.studID.retryRPDAttempt);
            setPRRetry(data.studID.retryPRAttempt);
            setWcdRetry(data.studID.retryWCDAttempt);

            if (data.studID.isStudent) {
                setStudentStatus("Active");
            } else {
                setStudentStatus("Terminated");
            }
            
            if (data.studID.retryRPDAttempt >= 3) {
                setRpdStatus("The student has recieved fail grade for 3 consecutive times. Thus, he/she has been terminated.");
            }
            else if (data.rpdID === null) {
                setRpdStatus("The student either has not apply for RPD or has not re-apply RPD after receiving fail grade.");
             
            } else if (data.rpdID.status === undefined) {
                setRpdStatus("The student's RPD application OR re-application was approved. However, the result is not yet evaluate by the authorities.");
             
            } else {
                setRpdStatus(data.rpdID.status ?
                    "The student has passed the RPD."
                        :
                    "The student has failed the RPD."
                );

                if (data.rpdID.status === true) {
                    setIsPassedRPD(true)
                } 
            }
            
            if (data.studID.retryWCDAttempt >= 3) {
                setWcdStatus("The student has recieved fail grade for 3 consecutive times. Thus, he/she has been terminated.");
            }
            else if (data.wcdID === null) {
                setWcdStatus("The student either has not apply for WCD or has not re-apply WCD after receiving fail grade.");
            } else if (data.wcdID.status === undefined) {
                setWcdStatus("The student's WCD application OR re-application was approved. Howvever, the result is not yet evaluate by the authorities.");
            } else {
                setWcdStatus(data.wcdID.status ?
                    "The student has passed the WCD."
                        :
                    "The student has failed the WCD."
                );

                if (data.wcdID.status === true) {
                    setIsPassedWCD(true)
                } 
            }

            if (data.studID.retryPRAttempt >= 3) {
                setPRStatus("The student has recieved fail grade for 3 consecutive times. Thus, he/she has been terminated.");
            }
            else if (data.reportProgressID === null) {
                setPRStatus(`The student either has not submit the report OR has not re-submit the report after receiving fail grade.`);
            } else if (data.reportProgressID.status === undefined) {
                setPRStatus("The student has submitted the report, but the result is not yet evaluate by the authorities.");
            } else {
                setPRStatus(data.reportProgressID.status ?
                    "The student has passed the PR."
                        :
                    "The student has failed the PR."
                );

                if (data.reportProgressID.status === true) {
                    setIsPassedPR(true)
                } 
            }
            console.log(data);
        };
        fetching();
    }, [id]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`http://localhost:5000/api/faculty/facultyFetchPastRPDDataStudent/${id}`);
            setPastCurrentDataRPD(data);
        };
        fetching();
    }, [id]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`http://localhost:5000/api/faculty/facultyFetchPastWCDDataStudent/${id}`);
            setPastCurrentDataWCD(data);
        };
        fetching();
    }, [id]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`http://localhost:5000/api/faculty/facultyFetchPastPRDataStudent/${id}`);
            setPastCurrentDataPR(data);
        };
        fetching();
    }, [id]);

    const getColorObject = (isPassed) => {
        return isPassed === null ? { color: 'green' } : isPassed ? { color: 'green' } : { color: 'red' };
    };
      
      const textColor = { ...getColorObject(studentStatus === 'Active') };
      const supervisorColor = { ...getColorObject(supervisor) };
      const prColor = { ...getColorObject(isPassedPR) };
      const rpdColor = { ...getColorObject(isPassedRPD) };
      const wcdColor = { ...getColorObject(isPassedWCD) };

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

    if(studentStatus === "Terminated") {

        var terminationCause;

        if (rpdRetry >= 3) {
            terminationCause = "Research Proposal Defence (RPD)";
        }
        else if (wcdRetry >= 3) {
          terminationCause = "Work Completion Defence (WCD)";
        }
        else if (prRetry >= 3) {
          terminationCause = "Progress Report (PR)";
        }

        msgStatus = <><span className="invalid-msg">Student Status: </span>
            {
                (rpdRetry >= 3 || wcdRetry >= 3 || prRetry >= 3) ? 
                `Terminated. Student is lack in the study performance. He/She has received 3 consecutive fail grade for ${terminationCause}. 
                 Hence, his/her has been terminated automatically by the system.`
                    : `Terminated. Student had exceed the allowed max. study duration (years) of study`
            } </>
    } else {
        msgStatus = <><span className="valid-msg">Student Status: </span>
            Active. Student is active in the program.</>
    }

    return (
        <FacultyTemplate>
            <div className="form-title-desc-container">Details of The Student</div>
                <div className="row" style={{marginTop: '40px'}}>
                    <div className="col-5 instruction-box" style={{borderRadius: '5px'}}>
                        <div className="row" style={{marginTop: '20px'}}>
                            <div style={{borderRadius: '5px'}}>
                                <Table className="table-borderless mt-1" style={{fontFamily: 'Montserrat'}}>
                                    <thead>
                                        <tr>
                                            <th><i className="fa-solid fa-circle-info" style={{whiteSpace: "nowrap"}}> Basic Student Details </i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img className="profileCentering roundImg mt-3" src="/image/student.png" alt="React Image" height={60} width={60} />  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span style={{color: 'green'}} className="mr-2">Student Name:</span>{usernameStud}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span style={supervisorColor} className="mr-2">Supervisor:</span>{supervisor}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span style={{color: 'green'}} className="mr-2">Date Joined:</span>{moment(dateJoin).format('DD/MM/YYYY')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span style={{color: 'green'}} className="mr-2">Degree Level:</span>{degreeLvl}
                                            </td>
                                        </tr>
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
                    <div className="col instruction-box" style={{borderRadius: '5px'}}>
                        
                        <div className="row" style={{marginTop: '20px'}}>
                            <div style={{borderRadius: '5px'}}>
                                    <Table className="table-borderless mt-1" style={{fontFamily: 'Montserrat'}}>
                                        <thead>
                                            <tr>
                                                <th><i className="fa-solid fa-circle-info" style={{whiteSpace: "nowrap"}}> Current Academic Performance Details </i></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span style={rpdColor} className="mr-2">RPD Status:</span>{rpdStatus}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span style={wcdColor} className="mr-2">WCD Status:</span>{wcdStatus}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span style={prColor} className="mr-2">PR Status:</span>{prStatus}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                            </div>
                        </div>
                        <div style={{borderRadius: '5px'}}>
                            <div className="mt-4">
                                <span><i className="fa-solid fa-circle-info" style={{whiteSpace: "nowrap"}}> Academic Record History </i></span>
                            </div>
                            <Tabs defaultActiveKey="Research Proposal Defence" id="fill-tab-example" className="mb-3 tab mt-2" justify transition={false}>
                                <Tab eventKey="Research Proposal Defence" title="Research Proposal Defence">
                                    <CDBContainer style={{padding: '0', textAlign: "center"}}>
                                        <CDBTable borderless>
                                            <CDBTableHeader>
                                            <tr className='table-desc'>
                                                <th>Date</th>
                                                <th>Name</th>
                                                <th>Mini Thesis Title</th>
                                                <th>Grade</th>
                                                <th>{}</th>
                                            </tr>
                                            </CDBTableHeader>
                                            <CDBTableBody>
                                                {
                                                    pastCurrentDataRPD.length > 0 ? (pastCurrentDataRPD.map((list) => (
                                                        <tr className="table-desc" key={list._id}>
                                                            <td> {moment(list.updatedAt).format("DD/MM/YYYY")} </td>
                                                            <td> {list.fullname} </td>
                                                            <td> {list.miniThesisTitle} </td>
                                                            <td> {list.status === undefined ? "To be evaluated" : list.status ? "Pass" : "Fail" } </td>
                                                        </tr>
                                                    ))) : (
                                                    <tr className="table-desc">
                                                        <td colSpan="5">No data</td>
                                                    </tr>
                                                )}
                                            </CDBTableBody>
                                        </CDBTable>
                                    </CDBContainer>
                                </Tab>

                                <Tab eventKey="Work Completion Defence" title="Work Completion Defence">
                                    <CDBContainer style={{padding: '0', textAlign: "center"}}>
                                        <CDBTable borderless>
                                            <CDBTableHeader>
                                            <tr className='table-desc'>
                                                <th>Date</th>
                                                <th>Name</th>
                                                <th>Full Thesis Title</th>
                                                <th>Grade</th>
                                                <th>{}</th>
                                            </tr>
                                            </CDBTableHeader>
                                            <CDBTableBody>
                                                {
                                                    pastCurrentDataWCD.length > 0 ? (pastCurrentDataWCD.map((list) => (
                                                        <tr className="table-desc" key={list._id}>
                                                            <td> {moment(list.updatedAt).format("DD/MM/YYYY")} </td>
                                                            <td> {list.fullname} </td>
                                                            <td> {list.thesisTitle} </td>
                                                            <td> {list.status === undefined ? "To be evaluated" : list.status ? "Pass" : "Fail" } </td>
                                                        </tr>
                                                    ))) : (
                                                        <tr className="table-desc">
                                                            <td colSpan="5">No data</td>
                                                        </tr>
                                                )}
                                            </CDBTableBody>
                                        </CDBTable>
                                    </CDBContainer>
                                </Tab>

                                <Tab eventKey="Progress Report" title="Progress Report">
                                    <CDBContainer style={{padding: '0', textAlign: "center"}}>
                                        <CDBTable borderless>
                                            <CDBTableHeader>
                                            <tr className='table-desc'>
                                                <th>Date</th>
                                                <th>Name</th>
                                                <th>Grade</th>
                                                <th>{}</th>
                                            </tr>
                                            </CDBTableHeader>
                                            <CDBTableBody>
                                                {
                                                    pastCurrentDataPR.length > 0 ? (pastCurrentDataPR.map((list) => (
                                                        <tr className="table-desc" key={list._id}>
                                                            <td> {moment(list.updatedAt).format("DD/MM/YYYY")} </td>
                                                            <td> {list.studentUser.usernameStud} </td>
                                                            <td> {list.status === undefined ? "To be evaluated" : list.status ? "Pass" : "Fail" } </td>
                                                        </tr>
                                                    ))) : (
                                                        <tr className="table-desc">
                                                            <td colSpan="4">No data</td>
                                                        </tr>
                                                )}
                                            </CDBTableBody>
                                        </CDBTable>
                                    </CDBContainer>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
        </FacultyTemplate>
    )
}

export default FacultyViewStudentDataID;
