import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { facultyUpdateAssignSupervision } from "../../../actions/facultyAction";
import { Form, Table, Button } from "react-bootstrap";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "../InputForm.css";

const FacultyAssignNumSupID = () => {

    let navigate = useNavigate();
    const [usernameSup, setUserNameSup] = useState();
    const [academicPos, setAcademicPos] = useState();
    const [numSupervision, setNumSupervision] = useState();

    const { id } = useParams();
    const dispatch =  useDispatch();

    const facultyLoginState = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLoginState;

    const facultyUpdateAssignSupervisionState = useSelector((state) => state.facultyUpdateAssignSupervision);
    const { loading, error, successMsg } = facultyUpdateAssignSupervisionState;

    useEffect(() => {
        if (!facultyInfo) {
          navigate('/');
        }
    }, [navigate, facultyInfo]);

    useEffect(() => {
        const fetching = async () => {
        
            const { data } = await axios.get(`http://localhost:5000/api/faculty/facultyReadAssignSupervision/${id}`);

            setUserNameSup(data.usernameSup);
            setAcademicPos(data.academicPos);
            setNumSupervision(data.numSupervision);
        };
        fetching();
    }, [id]);

    useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/facultyAssignNumSupervisor");
          }, 2000);
          return () => clearTimeout(timer);
        }
    }, [navigate, successMsg])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(facultyUpdateAssignSupervision(id, numSupervision, academicPos));
    };

    return (
        <FacultyTemplate>
            <div className="form-title-desc-container">Details of The Supervisors</div>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {successMsg && <SuccessMessage variant="success">{"Assigned successfully!"}</SuccessMessage>}
                {loading && <Loading />}
                <div className="row" style={{marginTop: '40px'}}>
                    <div className="col-5 instruction-box" style={{borderRadius: '5px'}}>
                        <Table className="table-borderless" style={{fontFamily: 'Montserrat'}}>
                            <thead>
                                <tr>
                                    <th><i className="fa-solid fa-triangle-exclamation" style={{color: 'red', textTransform: 'uppercase'}}> Note </i></th>
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
                        <Form className="form" onSubmit={submitHandler} style={{marginTop: 0}}>
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
                            <Button className=" mt-4 float-right" variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
        </FacultyTemplate>
    )
}

export default FacultyAssignNumSupID;
