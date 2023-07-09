import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import moment from 'moment';
import { BASE_URL_2 } from "../../../urlPath";
import {useParams } from 'react-router-dom';
import SupervisorTemplate from "../../../components/SupervisorTemplate";

const SupervisorViewMeetingLogID = () => {
    
    const { id } = useParams();

    const [meetingDate, setMeetingDate] = useState();
    const [meetingContent, setMeetingContent] = useState();

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`${BASE_URL_2}api/supervisor/supervisorReadMeetingLog/${id}`);

            setMeetingDate(data.dateLog);
            setMeetingContent(data.contentLog); 

            console.log(data);
        };
        fetching();
    }, [id]);
  
    return (
        <SupervisorTemplate>
            <div className="form-title-desc-container">Meeting Log Form</div>
            <Form className="form">
                <Form.Group as={Row}  controlId="formBasicEmail">
                    <Form.Label column sm={2} style={{marginTop: -5}}>Submission's Date</Form.Label>
                    <Col sm={10} mb={3}>
                        <small>{moment(meetingDate).format('l')}</small>
                    </Col>
                    <Form.Label column sm={2}>Decription</Form.Label>
                    <Col sm={10} mb={3}>
                        <Form.Control as="textarea" rows={3} value={meetingContent}
                            placeholder="null"
                            className="py-4 input-request"
                            disabled
                        />
                    </Col>
                </Form.Group>
            </Form>
        </SupervisorTemplate>
    )
}

export default SupervisorViewMeetingLogID
