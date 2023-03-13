import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams } from 'react-router-dom';
import { Form, Table } from "react-bootstrap";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "../InputForm.css";

const FacultyAssignNumSupID = () => {

    const [usernameSup, setUserNameSup] = useState();
    const [academicPos, setAcademicPos] = useState();
    const [numSupervision, setNumSupervision] = useState();

    const { id } = useParams();

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
        <FacultyTemplate>
            <div className="form-title-desc-container">Details of The Supervisors</div>
            <div className="row" style={{marginTop: '40px'}}>
                <div className="col-5 instruction-box" style={{borderRadius: '5px'}}>
                    <Table className="table-borderless" style={{fontFamily: 'Montserrat'}}>
                        <thead>
                            <tr>
                                <th><i class="fa-solid fa-triangle-exclamation" style={{color: 'red', textTransform: 'uppercase'}}> Note </i></th>
                            </tr>
                            <tr>
                                <th>Position</th>
                                <th className="text-center" >Max. Supervision Allowed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Principal Lecturer</td>
                                <td className="text-center">6</td>
                            </tr>
                            <tr>
                                <td>Senior Lecturer</td>
                                <td className="text-center">5</td>
                            </tr>
                            <tr>
                                <td>Lecturer</td>
                                <td className="text-center">3</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col">
                    <Form className="form" style={{marginTop: 0}}>
                        <Form.Group  className="mb-4" controlId="title">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={usernameSup}
                                disabled
                                onChange={(e) => setUserNameSup(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="title">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={academicPos}
                                disabled
                                onChange={(e) => setAcademicPos(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4"controlId="title">
                            <Form.Label>Number of Supervision</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={numSupervision}
                                onChange={(e) => setNumSupervision(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </FacultyTemplate>
    )
}

export default FacultyAssignNumSupID;
