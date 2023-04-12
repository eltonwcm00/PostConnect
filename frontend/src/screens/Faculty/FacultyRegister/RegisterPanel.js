import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { facultyPanelRegistration} from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "../InputForm.css";

const RegisterPanel= () => {

    let navigate = useNavigate();
    const [usernamePanel, setUserNameFac] = useState("");
    const [password, setPassword] = useState("");
    const [cfrmPassword, setCfrmPassword] = useState("");

    const dispatch = useDispatch();

    const facultyPanelRegistrationState = useSelector((state) => state.facultyRegistration);
    const { loading, error, facultyInfo, successMsg } = facultyPanelRegistrationState;

      useEffect(() => {
        if (facultyInfo) {
          navigate("/facultyPanelRegistration");
        }
      }, [navigate, facultyInfo]);

      useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate("/facultyHomepage");
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [navigate, successMsg])

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(facultyPanelRegistration(usernamePanel, password, cfrmPassword));
    };

    const cancelBtn = () => {
      navigate(-1);
    }

    return (
      <FacultyTemplate>
        <div className="form-title-desc-container">Details Of The Panel</div>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {successMsg && <SuccessMessage variant="success">{"Register successfully!"}</SuccessMessage>}
          {loading && <Loading />}
            <Form className="form" onSubmit={submitHandler}>
              <Form.Group as={Row} className="mb-4" controlId="formBasicEmail">
                <Form.Label column sm={2}>Username</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={usernamePanel}
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
              <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
                <Col sm={10}>
                  <Button className=" mt-4 float-right" variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
                <Col sm={1}>
                  <Button className=" mt-4 float-right" variant="secondary" onClick={cancelBtn}>
                    Cancel
                  </Button>
                </Col>
              </Form.Group>
            </Form >
      </FacultyTemplate>       
    );
}

export default RegisterPanel;

