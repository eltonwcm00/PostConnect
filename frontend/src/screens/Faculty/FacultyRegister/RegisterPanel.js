import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { facultyPanelRegistration} from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import MainScreen from "../../../components/MainScreen";
import "./Register.css";
import Sidebar from "../../../components/Sidebar";

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
            navigate("/");
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [navigate, successMsg])

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(facultyPanelRegistration(usernamePanel, password, cfrmPassword));
    };

    return (

      <div className="container-fluid" style={{display: "contents"}}>
          <div className="row ">
            <div className="col">
              <Sidebar />
            </div>
            <div className="col-9">
              <MainScreen title="Panel Registration">
              <div className="form-title-desc-container">Details Of The Panel</div>
                <div className="loginContainer">
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

                    <Button className=" mt-4 float-right" variant="primary" type="submit">
                      Register
                    </Button>
                  </Form >
                  {/* <Row className="py-3">
                    <Col>
                      New Customer ? <Link to="/facultyPanelRegistration">Register Here</Link>
                    </Col>
                  </Row> */}
                </div>
              </MainScreen>
            </div>
          </div>
      </div>
    );
}

export default RegisterPanel;

