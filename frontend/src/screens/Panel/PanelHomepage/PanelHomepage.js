import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux"
import { Container, Row, Col } from "react-bootstrap";
import PanelTemplate from "../../../components/PanelTemplate";
import UserCounter from "../../../components/UserCounter";
import TodoList from "../../../components/ToDoList";
import Calendar from "react-calendar";

const PanelHomepage = () => {
  
  let navigate = useNavigate();
  const facultyImg = "/image/school.png";
  const supervisorImg = "/image/teacher.png";
  const studentImg = "/image/student.png";
    
  const panelLoginState = useSelector((state) => state.panelLogin);
  const { panelInfo } = panelLoginState;

  const [numFaculty, setNumFaculty] = useState();
  const [numSupervisor, setNumSupervisor] = useState();
  const [numStudent, setNumStudent] = useState();

  useEffect(() => {
      if (!panelInfo) {
        navigate("/");
      }
  }, [navigate, panelInfo]);

  function fetchData(apiEndpoint, setData) {
    return async () => {
      const { data } = await axios.get(`http://localhost:5000/api/faculty/${apiEndpoint}`);
      setData(data);
    };
  }

  useEffect(() => {
    const fetchNumFaculty = fetchData('facultyProfileCountFaculty', setNumFaculty);
    const fetchNumSupervisor = fetchData('facultyProfileCountSupervisor', setNumSupervisor);
    const fetchNumStudent = fetchData('facultyProfileCountStudent', setNumStudent);

    fetchNumFaculty();
    fetchNumSupervisor();
    fetchNumStudent();
  }, []);

  return (
    <PanelTemplate>
      <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
       <Container className="mt-4">
        <Row>
          <Col>
            <UserCounter userOneCount={numFaculty} userOneImg={facultyImg} userOneType={"TOTAL FACULTY"}
                         userTwoCount={numSupervisor} userTwoImg={supervisorImg} userTwoType={"TOTAL SUPERVISOR"}
                         userThreeCount={numStudent} userThreeImg={studentImg} userThreeType={"TOTAL STUDENT"}
            />    
            {console.log(numFaculty)}
            <TodoList/>  
          </Col>
          <Col xs={4}>
            <div style={{marginTop: '2.5em', marginLeft: '3em'}}>
              <h4 className="mb-3 toast-title">Calendar</h4>
              <Calendar
                dateFormat="MMMM d, yyyy"
              />
            </div>
          </Col>
        </Row>
       </Container>
    </PanelTemplate>
  )
}

export default PanelHomepage
