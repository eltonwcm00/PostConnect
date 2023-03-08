import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { facultyLogin } from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import MainScreen from "../../../components/MainScreen";
import "./FacultyLogin.css";

const FacultyLogin = () => {

    let navigate = useNavigate();
    const [userNameFac, setUserNameFac] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const facultyLoginState = useSelector((state) => state.facultyLogin);
    const { loading, error, facultyInfo, successMsg } = facultyLoginState;

    useEffect(() => {
        if (facultyInfo) {
          navigate("/facultyLogin");
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
        dispatch(facultyLogin(userNameFac, password));
      };

    return (
        <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {successMsg && <SuccessMessage variant="success">{facultyInfo.successMessage}</SuccessMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={userNameFac}
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
            Submit
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

export default FacultyLogin
