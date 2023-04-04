import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate } from 'react-router-dom';
import { facultyUpdateApplication, facultyApproveApplication } from "../../../actions/facultyAction";
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

    useEffect(() => {
        // dispatch(panelReadRPD());
        if (!panelInfo) {
          navigate("/");
        }
    }, [dispatch, navigate, panelInfo,]);

    useEffect(() => {
        const fetching2 = async () => {
        
            const { data } = await axios.get(`http://localhost:5000/api/panel/panelEvaluateRPD/${id}`);

            setFullName(data.fullname);
            setMiniThesisTitle(data.miniThesisTitle);
            setDateScheduleRPD(moment(data.dateScheduleRPD).format('l'));

            console.log(data);
        };
        fetching2();
    }, [id]);

    const gradeSelection = (e) => {
        setGrade(e.target.value);
    };

    const submitSelection = (e) => {
        console.log(grade);
        switch(grade) {
            case 'Satisfactory': 
                // dispatch(action())
                break;
            case 'Unsatisfactory':
                // dispatch(action())
                break;
            default:
                console.log('err');
        } 
    };

    return (
        <>
            <PanelTemplate>
                <div className="form-title-desc-container">Details of The Research Proposal Defence</div>
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
                    <i class="fa-solid fa-arrow-pointer" style={{ position:'absolute', marginLeft: '3em', marginTop: '1em'}}>
                    </i> 
                    <a href={dummyPDF} target="_blank">View</a>
                    </Col>
                </Form.Group>
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
                
                <Button className=" mt-4 submit-btn" variant="primary" type="submit" onClick={submitSelection}>
                    Submit 
                </Button>
            </Form>     
            </PanelTemplate>
        </>
        
    )
}

export default PanelEvaluateRPDID
