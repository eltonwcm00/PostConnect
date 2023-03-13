import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {useParams } from 'react-router-dom';
import { Form } from "react-bootstrap";

const FacultyAssignNumSupID = () => {

    const [usernameSup, setUserNameSup] = useState();
    const [academicPos, setAcademicPos] = useState();
    const [numSupervision, setNumSupervision] = useState();

    const { id } = useParams();

    const facultyInfo = useSelector((state) => state.facultyLogin);

    const config = {
        headers: {
          Authorization: `Bearer ${facultyInfo.token}`,
        },
    };

    useEffect(() => {
        const fetching = async () => {
        
        const { data } = await axios.get(`http://localhost:5000/api/faculty/facultyReadAssignSupervision/${id}`);

        setUserNameSup(data.usernameSup);
        setAcademicPos(data.academicPos);
        setNumSupervision(data.numSupervision);
        };
        fetching();
    }, [id]);

    return (
        <Form>
            <Form.Group controlId="title">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={usernameSup}
                onChange={(e) => setUserNameSup(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={academicPos}
                onChange={(e) => setAcademicPos(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Number of Supervision</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={numSupervision}
                onChange={(e) => setNumSupervision(e.target.value)}
              />
            </Form.Group>
        </Form>
    )
}

export default FacultyAssignNumSupID;
