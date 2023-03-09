import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { facultyLogin } from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "../InputForm.css";

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
      <FacultyTemplate>
        <div className="form-title-desc-container">Details Of The Faculty</div>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {successMsg && <SuccessMessage variant="success">{facultyInfo.successMessage}</SuccessMessage>}
        {loading && <Loading />}
        <Form className="form" onSubmit={submitHandler}>
          <Form.Group as={Row} className="mb-4" controlId="formBasicEmail">
            <Form.Label column sm={2}>Username</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={userNameFac}
                placeholder="Enter Username"
                onChange={(e) => setUserNameFac(e.target.value)}
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

          <Button className=" mt-4 float-right" variant="primary" type="submit">
            Submit
          </Button>
        </Form >
      </FacultyTemplate>
    );
}

export default FacultyLogin

