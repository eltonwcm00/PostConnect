import React from "react";
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container, Row, Col } from 'react-bootstrap';
import '../../LandingPage/LandingPage.css';

const RegisterHomepage = () => {

    let navigate = useNavigate();
    const [radioValue, setRadioValue] = useState("");
  
    const accSelection = (e) => {
      setRadioValue(e.target.value);
    };
  
    const procSelection = (e) => {
      console.log(radioValue);
  
      switch(radioValue) {
        case 'student': 
          navigate("/facultyStudentRegistration"); //***change to spefic login path after, the comp has created
          break;
        case 'supervisor': 
          navigate("/facultySupervisorRegistration");
          break;
        case 'panel': 
          navigate("/facultyPanelRegistration");
          break;
        default:
          console.log('err');
      }
    };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: '#022c43'}}>
      <Container>
        <h3 className="main-title">Choose Account Type to Register</h3>
          <Row className="justify-content-md-center">
            <Col className="user-container" xl={2}>
              <Row>
                <input type="radio" id="vehicle1" name="vehicle1" value="student" onChange={accSelection}/>
                <img src="/image/student.png" alt="React Image"/>
              </Row>
              <Col>Student</Col>
            </Col>

            <Col className="user-container" xl={2}>
              <Row>
                <input type="radio" id="vehicle1" name="vehicle1" value="supervisor" onChange={accSelection}/>
                <img src="/image/teacher.png" alt="React Image"/>
              </Row>
              <Col>Supervisor</Col>
            </Col>

            <Col className="user-container" xl={2}>
              <Row>
                <input type="radio" id="vehicle1" name="vehicle1" value="panel" onChange={accSelection}/>
                <img src="/image/marking.png" alt="React Image"/>
              </Row>
              <Col>Panel</Col>
            </Col>
          </Row>
          <Row className="justify-content-md-center mt-5">
            <Button variant="primary" className="btn-md proceed-btn" type="submit" onClick={procSelection}>
              Proceed
            </Button>
          </Row>
      </Container>
    </div>
  )
}

export default RegisterHomepage
