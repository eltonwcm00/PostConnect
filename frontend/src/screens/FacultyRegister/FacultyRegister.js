import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { facultyPanelRegistration} from "../../actions/facultyAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import MainScreen from "../../components/MainScreen";
import "./FacultyRegister.css";

const FacultyRegister= () => {

    let navigate = useNavigate();
    const [userNamePanel, setUserNameFac] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState({})

    const dispatch = useDispatch();

    const facultyPanelRegistrationState = useSelector((state) => state.facultyPanelRegistration);
    const { loading, error, facultyInfo, successMsg } = facultyPanelRegistrationState;

    useEffect(() => {
        if (facultyInfo) {
          navigate("/facultyPanelRegistration");
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
      dispatch(facultyPanelRegistration(userNamePanel, password));
    };

    return (
        <MainScreen title="Register">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {successMsg && <SuccessMessage variant="success">{"Register successfully!"}</SuccessMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={userNamePanel}
              placeholder="Enter Username"
              onChange={(e) => setUserNameFac(e.target.value)}
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

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form >
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/facultyPanelRegistration">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
    );
}

export default FacultyRegister;

