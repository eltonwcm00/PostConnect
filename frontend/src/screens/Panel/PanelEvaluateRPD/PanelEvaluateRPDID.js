import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate } from 'react-router-dom';
import { panelEvaluatePassRPD, panelEvaluateFailRPD } from "../../../actions/panelAction";
import { BASE_URL_2 } from "../../../urlPath";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import PanelTemplate from "../../../components/PanelTemplate";
import ViewPDF from "../../../components/ViewPDF";
import dummyPDF from "./1181203056_ChuaFangFang_FYP1Report.pdf"

const PanelEvaluateRPDID = () => {
    
    const [fullname, setFullName] = useState();
    const [miniThesisTitle, setMiniThesisTitle] = useState();
    const [miniThesis, setThesis] = useState();
    const [dateScheduleRPD, setDateScheduleRPD] = useState();
    const [grade, setGrade] = useState("");
    
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { id } = useParams();

    const panelLogin = useSelector((state) => state.panelLogin);
    const { panelInfo } = panelLogin;
    const panelEvaluateRPD = useSelector((state) => state.panelEvaluateRPD);
    const { loading, error, successApproveMsg, successRejectMsg } = panelEvaluateRPD;

    useEffect(() => {
        if (!panelInfo) {
          navigate("/");
        }
    }, [dispatch, navigate, panelInfo,]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`${BASE_URL_2}api/panel/panelEvaluateRPD/${id}`);

            setFullName(data.fullname);
            setMiniThesisTitle(data.miniThesisTitle);
            setDateScheduleRPD(moment(data.dateScheduleRPD).format('l'));

            console.log(data);
        };
        fetching();
    }, [id]);

    const gradeSelection = (e) => {
        setGrade(e.target.value);
    };

    const submitSelection = (e) => {
        e.preventDefault();
        console.log(grade);
        switch(grade) {
            case 'Satisfactory': 
                dispatch(panelEvaluatePassRPD(id));
                break;
            case 'Unsatisfactory':
                dispatch(panelEvaluateFailRPD(id));
                break;
            default:
                console.log('err');
        } 
    };

    useEffect(() => {
        if (successApproveMsg || successRejectMsg) {
          const timer = setTimeout(() => {
            navigate("/panelEvaluateRPD");
          }, 5000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successApproveMsg, successRejectMsg])

    return (
        <>
            <PanelTemplate>
                <div className="form-title-desc-container">Details of The Research Proposal Defence</div>
                {loading && <Loading/>}
                {error && <ErrorMessage variant="danger">{error.message}</ErrorMessage>}
                {successApproveMsg && <SuccessMessage variant="success">{successApproveMsg.approveMsg}</SuccessMessage>}
                {successRejectMsg && <SuccessMessage variant="success">{successRejectMsg.rejectMsg}</SuccessMessage>}
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
                    <Form.Label column sm={2}>Mini Thesis Title</Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={miniThesisTitle}
                        placeholder="null"
                        className="py-4 input-request"
                        disabled
                    />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                    <Form.Label column sm={2}>Mini Thesis File</Form.Label>
                    <Col sm={10}>
                    <a href={dummyPDF} target="_blank">View Here</a>
                    </Col>
                </Form.Group>
                { moment(dateScheduleRPD).format('l') <= moment().format('l') && 
                    <Form.Group as={Row} className="mb-5" controlId="formBasicPassword">
                        <Form.Label column sm={2}>Grade</Form.Label>
                        <Col sm={10}>
                        <Row>
                            <Col sm={5}>
                                <span>Satisfactory</span>
                                <input type="radio" value="Satisfactory" id="vehicle1" name="vehicle1" onChange={gradeSelection} style={{marginLeft: '5em', boxShadow: 'none'}}/>
                            </Col>
                            <Col>
                                <span>Unsatisfactory</span>                          
                                <input type="radio" value="Unsatisfactory" id="vehicle1" name="vehicle1" onChange={gradeSelection} style={{marginLeft: '6em', boxShadow: 'none'}}/>
                            </Col>
                        </Row>
                        </Col>
                    </Form.Group>
                }        
                {
                    moment(dateScheduleRPD).format('l') <= moment().format('l') && 
                        <Button className=" mt-4 submit-btn" variant="primary" type="submit" onClick={submitSelection}>
                            Submit 
                        </Button>
                }
                {
                    moment(dateScheduleRPD).format('l') > moment().format('l') && 
                        <Col className="col-5">
                            <small style={{color: 'red'}}>*Unable to evaluate the RPD, due to today's date is earlier than the schedule date</small>
                        </Col>
                }
            </Form>     
            </PanelTemplate>
        </>
        
    )
}

export default PanelEvaluateRPDID
