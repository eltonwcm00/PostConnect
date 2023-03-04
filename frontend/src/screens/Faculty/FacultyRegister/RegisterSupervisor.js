import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { facultySupervisorRegistration} from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import MainScreen from "../../../components/MainScreen";
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
        <MainScreen title="Supervisor Registration">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {successMsg && <SuccessMessage variant="success">{"Register successfully!"}</SuccessMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={usernameSup}
              placeholder="Enter Username"
              onChange={(e) => setUserNameSup(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confrim Password</Form.Label>
            <Form.Control
              type="password"
              value={cfrmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setCfrmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Academic Position</Form.Label>
            <Form.Control
              type="text"
              value={academicPos}
              placeholder="Academic Position"
              onChange={(e) => setAcademicPos(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Number of Supervision</Form.Label>
            <Form.Control
              type="text"
              value={numSupervision}
              placeholder="Number of Supervision"
              onChange={(e) => setNumSupervision(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form >
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/facultySupervisorRegistration">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
    );
}

export default RegisterSupervisor;

