import React from "react";
import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { BASE_URL_2 } from "../../urlPath";
import {Button, Container, Row, Col } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = () => {

  let navigate = useNavigate();
  const [radioValue, setRadioValue] = useState("");

  useEffect(() => {
    const fetching = async () => {
        await axios.post(`${BASE_URL_2}api/faculty/facultyInitDataStudent`);
    };
    fetching();
  }, []);

  useEffect(() => {
    localStorage.removeItem('facultyInfo');
    localStorage.removeItem('studentInfo');
    localStorage.removeItem('supervisorInfo');
    localStorage.removeItem('panelInfo');
  }, []);

  const accSelection = (e) => {
    setRadioValue(e.target.value);
  };

  const procSelection = (e) => {
    console.log(radioValue);

    switch(radioValue) {
      case 'faculty': 
        navigate("/facultyLogin"); 
        break;
      case 'student': 
        navigate("/studentLogin"); //***change to spefic login path after, the comp has created
        break;
      case 'supervisor': 
        navigate("/supervisorLogin");
        break;
      case 'panel': 
        navigate("/panelLogin");
        break;
      default:
        console.log('err');
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: '#071B63'}}>
      <Container>
        <h3 className="main-title">Choose Account Type</h3>
        {/* <center><img src="/image/postconnect.png" alt="PostConnect Logo"/></center> */}
          <Row className="justify-content-md-center">
            <Col className="user-container" xl={2}>
              <Row>
                <input type="radio" id="vehicle1" name="vehicle1" value="faculty" onChange={accSelection}/>
                <img src="/image/school.png" alt="React Image"/>
              </Row>
              <Col>Faculty</Col>
            </Col>

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
  );
}

export default LandingPage
