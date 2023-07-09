import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate } from 'react-router-dom';
import { panelEvaluatePR } from "../../../actions/panelAction";
import { BASE_URL_2 } from "../../../urlPath";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import PanelTemplate from "../../../components/PanelTemplate";
import dummyPDF from "./REFERENCE LETTER.pdf"

const PanelEvaluatePRID = () => {
    
    const [fullname, setFullName] = useState();
    const [miniThesis, setThesis] = useState();
    const [dateSetPR, setDateSetPR] = useState();
    const [dateSubmitPR, setDateSchedulePR] = useState();
    const [grade, setGrade] = useState(0);
    
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { id } = useParams();

    const panelLogin = useSelector((state) => state.panelLogin);
    const { panelInfo } = panelLogin;
    const panelEvaluateRPD = useSelector((state) => state.panelEvaluateRPD);
    const { loading, error, successApproveMsg } = panelEvaluateRPD;

    useEffect(() => {
        if (!panelInfo) {
          navigate("/");
        }
    }, [dispatch, navigate, panelInfo,]);

    useEffect(() => {
        const initFetching = async () => {            
            
            const { data } = await axios.get(`${BASE_URL_2}api/panel/panelReadPRSetDate`);
            
            setDateSetPR(moment(data.dateSetPR).format('l'));

            console.log(data);
        }
        initFetching();
    }, []);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`${BASE_URL_2}api/panel/panelEvaluatePR/${id}`);

            setFullName(data.studentUser.usernameStud);
            setDateSchedulePR(moment(data.dateSubmitPR).format('l'));

            console.log(data);
        };
        fetching();
    }, [id]);

    const gradeSelection = (e) => {
        setGrade(e.target.value);
    };

    const submitSelection = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure to approve?")) {
            console.log(grade);
            dispatch(panelEvaluatePR(id, grade));
        }
    };

    useEffect(() => {
        if (successApproveMsg) {
          const timer = setTimeout(() => {
            navigate("/panelEvaluatePR");
          }, 5000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successApproveMsg])

    return (
        <>
            <PanelTemplate>
                <div className="form-title-desc-container">Details of The Progress Report</div>
                {loading && <Loading/>}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {successApproveMsg && <SuccessMessage variant="success">{successApproveMsg.messagePRSuccess}</SuccessMessage>}
                <Form className="form">
                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Full Name</Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={fullname}
                        placeholder="null"
                        className="py-4 input-request"
                        disabled
                    />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Submission Date</Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={moment(dateSubmitPR).format('MMMM Do YYYY')}
                        placeholder="null"
                        className="py-4 input-request"
                        disabled
                    />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Progress Report</Form.Label>
                    <Col sm={10}>
                    <a href={dummyPDF} target="_blank">View Here</a>
                    </Col>
                </Form.Group>
                { moment().format('l') > moment(dateSetPR).format('l') ?
                    <>
                        <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                            <Form.Label column sm={2}>Grade</Form.Label>
                            <Col sm={10}>
                                <Row>
                                    <Col ><span>1</span> <input type="radio" value={1} id="vehicle1" name="vehicle1" onChange={gradeSelection} style={{boxShadow: 'none'}}/></Col>
                                    <Col><span>2</span><input type="radio" value={2} id="vehicle1" name="vehicle1" onChange={gradeSelection} style={{boxShadow: 'none'}}/></Col>
                                    <Col><span>3</span><input type="radio" value={3} id="vehicle1" name="vehicle1" onChange={gradeSelection} style={{boxShadow: 'none'}}/></Col>
                                    <Col><span>4</span><input type="radio" value={4} id="vehicle1" name="vehicle1" onChange={gradeSelection} style={{boxShadow: 'none'}}/></Col>
                                    <Col><span>5</span><input type="radio" value={5} id="vehicle1" name="vehicle1" onChange={gradeSelection} style={{boxShadow: 'none'}}/></Col>
                                </Row>
                            </Col>
                        </Form.Group>
                        <Button className=" mt-4 submit-btn" variant="primary" type="submit" onClick={submitSelection}>
                            Submit 
                        </Button>
                    </>
                   :
                   <Col className="col-5">
                       <small style={{color: 'red'}}>*Unable to evaluate the progress report, it can only be evaluated after the due date progress report's submission</small>
                   </Col>
                }        
            </Form>     
            </PanelTemplate>
        </>
    )
}

export default PanelEvaluatePRID
