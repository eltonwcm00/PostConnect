import React, { useState, useEffect } from "react";
//import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { facultyStudentRegistration} from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import MainScreen from "../../../components/MainScreen";
import "./Register.css";
import Sidebar from "../../../components/Sidebar";

const RegisterStudent = () => {
    let navigate = useNavigate();

    const [usernameStud, setUserNameStud] = useState("");
    const [password, setPassword] = useState("");
    const [cfrmPassword, setCfrmPassword] = useState("");
    const [dateJoin, setDateJoin] = useState(null);
    const [degreeLvl, setDegreeLvl] = useState("");

    const dispatch = useDispatch();

    const facultySupervisorRegistrationState = useSelector((state) => state.facultyRegistration);
    const { loading, error, facultyInfo, successMsg } = facultySupervisorRegistrationState;

    useEffect(() => {
        if (facultyInfo) {
          navigate("/facultyStudentRegistration");
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
      dispatch(facultyStudentRegistration(usernameStud, password, cfrmPassword, dateJoin, degreeLvl));
    };

    return (
      
      <div className="container-fluid" style={{display: "contents"}}>
        <div className="row ">
          <div className="col">
            <Sidebar />
          </div>
          <div className="col-9">
            <MainScreen title="Student Registration">
            <div className="form-title-desc-container">Details Of The Student</div>
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
                    value={usernameStud}
                    placeholder="Enter Username"
                    onChange={(e) => setUserNameStud(e.target.value)}
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
                <Form.Label column sm={2}>Date Join</Form.Label>
                <Col sm={10}>
                  <Calendar
                      value={dateJoin}
                      onChange={setDateJoin}
                      dateFormat="MMMM d, yyyy"
                  />
                </Col>
              </Form.Group>

              <Form.Select column sm aria-label="Default select example" value={degreeLvl} onChange={(e) => setDegreeLvl(e.target.value)}>
                  <option>Choose A Degree Level</option>
                  <option value="Master Degree (Part-Time)">Master Degree (Part-Time)</option>
                  <option value="Master Degree (Full-Time)">Master Degree (Full-Time)</option>
                  <option value="Doctoral Degree (Part-Time)">Doctoral Degree (Part-Time)</option>
                  <option value="Doctoral Degree (Full-Time)">Doctoral Degree (Full-Time)</option>
              </Form.Select>
            
              <Button className=" mt-4 float-right" variant="primary" type="submit">
                Register
              </Button>
            </Form >
            </div>
          </MainScreen>
          </div>
        </div>
      </div>
    );
}

export default RegisterStudent
