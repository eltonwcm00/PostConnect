import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { facultyUpdateSupervisorProfile, facultyUpdateStudentProfile,
         facultyUpdatePanelProfile } from '../../../actions/facultyAction';
import { BASE_URL_2 } from "../../../urlPath";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button } from "react-bootstrap";
import FacultyTemplate from '../../../components/FacultyTemplate';
import Calendar from 'react-calendar';
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";

const FacultyViewProfileID = () => {
  
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const updateProfileState = useSelector((state) => state.facultyUpdateApplication);
    const { loading, error, successApproveMsg } = updateProfileState;

    const [url, setUrl] = useState(location.pathname);

    useEffect(() => {
        const segments = location.pathname.split('/');
        segments.pop();
        const pathname = segments.join('/');
        setUrl(pathname);
    }, [location.pathname]);
    
    let executeURL;
    let isPanel = false, isSuper = false, isStud = false;
    const { id } = useParams();

    const [password, setPassword] = useState();
    const [cfrmPassword, setCfrmPassword] = useState("");

    const [fullnameStud, setFullNameStud] = useState();
    const [fullnameSup, setFullNameSup] = useState();
    const [fullnamePanel, setFullNamePanel] = useState();

    const [dateJoined, setDateJoined] = useState(null);
    const [degreeLvl, setDegreeLvl] = useState();
    const [academicPos, setAcademicPos] = useState();

    switch (url) {
        case "/panelProfileList": 
            executeURL = `${BASE_URL_2}api/panel/panelProfileList/${id}`;
            isPanel = true;
            break;
        case "/supervisorProfileList": 
            executeURL = `${BASE_URL_2}api/supervisor/supervisorProfileList/${id}`;
            isSuper = true;
            break;
        case "/studentProfileList": 
            executeURL = `${BASE_URL_2}api/student/studentProfileList/${id}`; 
            isStud = true;
            break;
        default:
            executeURL = "";
            break;
    }

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(executeURL);
            
            setFullNameStud(data.usernameStud || "");
            setFullNameSup(data.usernameSup || "");
            setFullNamePanel(data.usernamePanel || "");

            setDateJoined(new Date(data.dateJoin) || "");
            setDegreeLvl(data.degreeLvl || "");

            setAcademicPos(data.academicPos || "");
            
            console.log(data);
        };
        fetching();
    }, [executeURL]);

    const updateHandler = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure to update the user details?")) {
            if (isPanel) {
                dispatch(facultyUpdatePanelProfile(id, password, cfrmPassword));
            } else if (isSuper) {
                dispatch(facultyUpdateSupervisorProfile(id, password, cfrmPassword, academicPos));
            } else {
                dispatch(facultyUpdateStudentProfile(id, password, cfrmPassword, degreeLvl, dateJoined));
            }
        }
    }

    useEffect(() => {
        if (successApproveMsg) {
          const timer = setTimeout(() => {
            navigate("/facultyViewProfile");
          }, 5000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successApproveMsg])

    return (
        <FacultyTemplate>
        <div className="form-title-desc-container">
            {isPanel ? "Panel Profile" : isSuper ? "Supervisor Profile" : "Student Profile"}
        </div>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {successApproveMsg && <SuccessMessage variant="success">{"The account has been updated"}</SuccessMessage>}
            {loading && <Loading />}
            <Form className="form" enctype="multipart/form-data">
                <div>
                    <Form.Group as={Row} className="mb-5" controlId="formBasicEmail">
                        <Form.Label column sm={2}>
                            {
                                isPanel ? "Panel's Name" : 
                                isSuper ? "Supervisor's Name" : 
                                "Student's Name"
                            }
                        </Form.Label>
                        <Col sm={10} mb={3}>
                            <Form.Control
                                type="text"
                                value={
                                    isPanel ? fullnamePanel :
                                    isSuper ? fullnameSup :
                                    fullnameStud
                                }
                                placeholder="null"
                                onChange={
                                    (e) => isPanel ? setFullNamePanel(e.target.value) :
                                        isSuper ? setFullNameSup(e.target.value) :
                                        setFullNameStud(e.target.value)
                                }
                                className="py-4 input-request"
                                disabled
                            />
                        </Col>
                    </Form.Group>
                    {
                        isStud &&  
                        <>
                            <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                                <Form.Label column sm={2}>Date Joined</Form.Label>
                                <Col sm={10}>
                                    <Calendar
                                        value={dateJoined}
                                        onChange={setDateJoined}
                                        dateFormat="MMMM d, yyyy"
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                                <Form.Label column sm={2}>Degree Level</Form.Label>
                                <Col sm={10}>
                                    <Form.Select column sm aria-label="Default select example" value={degreeLvl} onChange={(e) => setDegreeLvl(e.target.value)}>
                                        <option>{degreeLvl}</option>
                                        <option value="Master Degree (Part-Time)">Master Degree (Part-Time)</option>
                                        <option value="Master Degree (Full-Time)">Master Degree (Full-Time)</option>
                                        <option value="Doctoral Degree (Part-Time)">Doctoral Degree (Part-Time)</option>
                                        <option value="Doctoral Degree (Full-Time)">Doctoral Degree (Full-Time)</option>
                                    </Form.Select> 
                                </Col> 
                            </Form.Group>
                        </>
                    }
                    {
                        isSuper &&
                        <>
                            <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                                <Form.Label column sm={2}>Academic Position</Form.Label>
                                <Col sm={10}>
                                    <Form.Select className="mb-4" column sm aria-label="Default select example" value={academicPos} onChange={(e) => setAcademicPos(e.target.value)}>
                                        <option>{academicPos}</option>
                                        <option value="Lecturer">Lecturer</option>
                                        <option value="Senior Lecturer">Senior Lecturer</option>
                                        <option value="Principal Lecturer">Principal Lecturer</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </>
                    }
                    <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
                        <Form.Label column sm={2}>New Password</Form.Label>
                        <Col sm={10}>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
                        <Form.Label column sm={2}>Confirm New Password</Form.Label>
                        <Col sm={10}>
                        <Form.Control
                            type="password"
                            value={cfrmPassword}
                            placeholder="Password"
                            onChange={(e) => setCfrmPassword(e.target.value)}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
                    <Col sm={10}>
                        <Button className=" mt-4 submit-btn" variant="primary" type="submit" onClick={updateHandler}>
                            Update 
                        </Button>
                    </Col>
                    </Form.Group>
                </div> 
            </Form>
        </FacultyTemplate>
    )
}

export default FacultyViewProfileID
