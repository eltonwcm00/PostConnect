import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL_2 } from "../../../urlPath";
import { Container, Row, Col } from "react-bootstrap";
import SupervisorTemplate from "../../../components/SupervisorTemplate";
import { StudentCounter } from "../../../components/UserCounter";
import TodoList from "../../../components/ToDoList";
import Calendar from "react-calendar";

const SupervisorHomepage = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const studentImg = "/image/student.png";
    
  const supervisorLoginState = useSelector((state) => state.supervisorLogin);
  const { supervisorInfo } = supervisorLoginState;

  const [numStudent, setNumStudent] = useState();

  useEffect(() => {
      if (!supervisorInfo) {
        navigate("/");
      }
  }, [navigate, supervisorInfo]);

  const { token } = useSelector((state) => state.supervisorLogin.supervisorInfo || {});

  useEffect (() => {
    const fetching = async () => {  
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${BASE_URL_2}api/supervisor/supervisorProfileCountSupervisingStudent`,
                                          config);
        setNumStudent(data);
      }
    };
    fetching();
  }, [dispatch, token])

  return (
    <SupervisorTemplate>
      <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
      <Container className="mt-4">
        <Row>
          <Col>
            <StudentCounter userOneCount={numStudent} userOneImg={studentImg} userOneType={"TOTAL STUDENT"}/>    
            {supervisorInfo && <TodoList userType={supervisorInfo._id} username={supervisorInfo.usernameSup}/>}
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
    </SupervisorTemplate>
  )
}

export default SupervisorHomepage
