import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { studentLogin } from "../../../actions/studentAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import "./StudentLogin.css";

const StudentLogin = () => {
  
    let navigate = useNavigate();
    const [usernameStud, setUsernameStud] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const studentLoginState = useSelector((state) => state.studentLogin);
    const { loading, error, studentInfo, successMsg } = studentLoginState;

    useEffect(() => {
      localStorage.removeItem('facultyInfo');
      localStorage.removeItem('studentInfo');
      localStorage.removeItem('supervisorInfo');
      localStorage.removeItem('panelInfo');
    }, []);

    useEffect(() => {
        if (studentInfo) {
          navigate("/studentLogin");
        }
    }, [navigate, studentInfo]);

    useEffect(() => {
      if (successMsg) {
        const timer = setTimeout(() => {
          navigate("/studentHomepage");
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [navigate, successMsg])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(studentLogin(usernameStud, password));
      };
  
  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: '#071B63'}}>
      <Container>
       <div className="register-form-title-desc-container">Login</div>
         <center><img src="/image/postconnect.png" alt="PostConnect Logo"/></center>
         {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
         {successMsg && <SuccessMessage variant="success">{studentInfo.successMessage}</SuccessMessage>}
         {loading && <Loading />}
         <Form className="register-stud-form" onSubmit={submitHandler}>
           <Form.Group as={Row} className="mb-4" controlId="formBasicEmail">
             <Form.Label className="col-register-form-label" column sm={2}>Username</Form.Label>
             <Col sm={10}>
               <Form.Control
                 type="text"
                 value={usernameStud}
                 placeholder="Enter the username"
                 onChange={(e) => setUsernameStud(e.target.value)}
               />
             </Col>
           </Form.Group>

           <Form.Group as={Row} className="mb-4" controlId="formBasicPassword">
             <Form.Label className="col-register-form-label" column sm={2}>Password</Form.Label>
             <Col sm={10}>
               <Form.Control
                 type="password"
                 value={password}
                 placeholder="Enter the password"
                 onChange={(e) => setPassword(e.target.value)}
               />
             </Col>
           </Form.Group>

           <Button className=" mt-4 float-right submit-btn" variant="primary" type="submit">
             Login
           </Button>
         </Form >
       </Container>
    </div>
  )
}

export default StudentLogin
