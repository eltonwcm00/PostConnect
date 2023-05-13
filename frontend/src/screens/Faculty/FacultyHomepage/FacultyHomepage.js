import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Form, Button, Row, Col, Tab, Tabs } from "react-bootstrap";
import FacultyTemplate from "../../../components/FacultyTemplate";
import UserCounter from "../../../components/UserCounter";

const FacultyHomepage = () => {

  let navigate = useNavigate();
  const panelImg = "/image/marking.png";
  const supervisorImg = "/image/teacher.png";
  const studentImg = "/image/student.png";

  const facultyLoginState = useSelector((state) => state.facultyLogin);
  const { facultyInfo } = facultyLoginState;

  const [numPanel, setNumPanel] = useState();
  const [numSupervisor, setNumSupervisor] = useState();
  const [numStudent, setNumStudent] = useState();

  useEffect(() => {
      if (!facultyInfo) {
        navigate("/");
      }
  }, [navigate, facultyInfo]);

  function fetchData(apiEndpoint, setData) {
    return async () => {
      const { data } = await axios.get(`http://localhost:5000/api/faculty/${apiEndpoint}`);
      setData(data);
    };
  }

  useEffect(() => {
    const fetchNumPanel = fetchData('facultyProfileCountPanel', setNumPanel);
    const fetchNumSupervisor = fetchData('facultyProfileCountSupervisor', setNumSupervisor);
    const fetchNumStudent = fetchData('facultyProfileCountStudent', setNumStudent);

    fetchNumPanel();
    fetchNumSupervisor();
    fetchNumStudent();
  }, []);

  return (
    <FacultyTemplate>
       <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
       <Container className="mt-4">
        <Row>
          <Col style={{backgroundColor: 'green'}}>
            <UserCounter userOneCount={numPanel} userOneImg={panelImg} userOneType={"TOTAL PANEL"}
                         userTwoCount={numSupervisor} userTwoImg={supervisorImg} userTwoType={"TOTAL SUPERVISOR"}
                         userThreeCount={numStudent} userThreeImg={studentImg} userThreeType={"TOTAL STUDENT"}
            />
            <Row>
              To-Do List
            </Row>
          </Col>
          <Col xs={4} style={{backgroundColor: 'red'}}>
            Calender
          </Col>
        </Row>
       </Container>
    </FacultyTemplate>  
  )
}
export default FacultyHomepage
