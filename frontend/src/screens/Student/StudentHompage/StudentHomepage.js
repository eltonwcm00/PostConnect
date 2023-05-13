import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { studentStatus } from "../../../actions/studentAction";
import { Toast, ToastContainer, Tab, Tabs, Row, Col } from 'react-bootstrap';
import StudentTemplate from "../../../components/StudentTemplate";
import Notification from "../../../components/Notification";
import Clock from "../../../components/Clock";
import Calendar from "react-calendar";
import TerminationPopout from "../../../components/TerminationPopout";
import TodoList from "../../../components/ToDoList";
import './StudentHomepage.css';
import "../../../components/Notification.css"

const StudentHomepage = () => {

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.studentLogin.studentInfo || {});

  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentStatusState = useSelector((state) => state.studentStatusValidator);
  const { flag, studentTerminationStatus } = studentStatusState;

  const [access, setAccess] = useState();

  useEffect(() => {
    if (studentInfo) {
      dispatch(studentStatus());
    }
  }, []);

  useEffect(() => {
    const fetching = async () => {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:5000/api/student/systemReadVerifyStudentStatus`,
          config
        );

        setAccess(data.isStudent);
        console.log(data);
      }
    };
    fetching();
  }, [dispatch, token]);
  
  return (
    <>
      {access === true ? (
        <StudentTemplate>
          <Row className="mt-5" xs={12}>
            <Col xs={5}>
              <div style={{ marginTop: '1em', marginLeft: '3em' }}>
                <h4 className="mb-3 toast-title">To-Do List</h4>
                <TodoList />
              </div>
            </Col>
            <Col xs={4}>
              <div style={{ marginTop: '2.5em', marginLeft: '3em' }}>
                <h4 className="mb-3 toast-title">Calendar</h4>
                <Calendar dateFormat="MMMM d, yyyy" />
              </div>
            </Col>
            <Col xs={3}>
              <div style={{ marginTop: '2.5em', marginLeft: '3em' }}>
                <h4 className="mb-3 toast-title">Clock</h4>
                <Clock />
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={12} style={{marginLeft: '3%'}}>
              <Notification />
            </Col>
          </Row>
        </StudentTemplate>
      ) : (
        <TerminationPopout message={flag && <>{studentTerminationStatus.terminateMsg}</>} />
      )}
    </>
  );
  
}

export default StudentHomepage
