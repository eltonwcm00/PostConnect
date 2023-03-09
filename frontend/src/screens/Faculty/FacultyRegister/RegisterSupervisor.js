import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { facultySupervisorRegistration} from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "./Register.css";

const RegisterSupervisor= () => {

    let navigate = useNavigate();
    const [usernameSup, setUserNameSup] = useState("");
    const [password, setPassword] = useState("");
    const [cfrmPassword, setCfrmPassword] = useState("");
    const [academicPos, setAcademicPos] = useState("");
    const [numSupervision, setNumSupervision] = useState("");

    const dispatch = useDispatch();

    const facultySupervisorRegistrationState = useSelector((state) => state.facultyRegistration);
    const { loading, error, facultyInfo, successMsg } = facultySupervisorRegistrationState;

    useEffect(() => {
        if (facultyInfo) {
          navigate("/facultySupervisorRegistration");
        }
      }, [navigate, facultyInfo]);

      useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/");
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [navigate, successMsg])

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(facultySupervisorRegistration(usernameSup, password, cfrmPassword, numSupervision, academicPos));
    };

    return (
      <FacultyTemplate>
        <div className="form-title-desc-container">Details Of The Supervisor</div>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {successMsg && <SuccessMessage variant="success">{"Register successfully!"}</SuccessMessage>}
          {loading && <Loading />}
          <Form className="form" onSubmit={submitHandler}>
            <Form.Group as={Row} className="mb-4" controlId="formBasicEmail">
              <Form.Label column sm={2}>Username</Form.Label>
                <Col sm={10}>
                  <Form.Control
                  type="text"
                  value={usernameSup}
                  placeholder="Enter Username"
                  onChange={(e) => setUserNameSup(e.target.value)}
                  />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
                <Form.Label column sm={2}>Password</Form.Label>
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
                <Form.Label column sm={2}>Confrim Password</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    value={cfrmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setCfrmPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>

            <Form.Select className="mb-4" column sm aria-label="Default select example" value={academicPos} onChange={(e) => setAcademicPos(e.target.value)}>
                <option>Select the academic position</option>
                <option value="lecturer">Lecturer</option>
                <option value="Senior Lecturer">Senior Lecturer</option>
                <option value="Principal Lecturer">Principal Lecturer</option>
            </Form.Select>
            
            <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
              <Form.Label column sm={2}>Number of Supervision</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={numSupervision}
                  placeholder="Number of Supervision"
                  onChange={(e) => setNumSupervision(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Button className=" mt-4 float-right" variant="primary" type="submit">
              Register
            </Button>
          </Form >
      </FacultyTemplate>
    );
}

export default RegisterSupervisor;

