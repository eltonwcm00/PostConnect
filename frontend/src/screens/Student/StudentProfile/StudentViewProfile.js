import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from 'moment';
import StudentTemplate from "../../../components/StudentTemplate";

const StudentViewProfile = () => {
  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;

  useEffect(() => {
    if (!studentInfo) {
      navigate('/');
    }
  }, [navigate, studentInfo]);

  const { token } = useSelector((state) => state.studentLogin.studentInfo || {});

  const [name, setName] = useState();
  const [dateJoined, setDateJoined] = useState();
  const [degreeLvl, setDegreeLvl] = useState();
  const [supervisor, setSupervisor] = useState();

  useEffect(() => {
    const fetching = async () => {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:5000/api/student/studentViewOwnProfile`,
          config
        );

        setName(data.usernameStud);
        setDateJoined(data.dateJoin);
        setDegreeLvl(data.degreeLvl);
        
        if (data.supervisorUser && data.supervisorUser.usernameSup) {
          setSupervisor(data.supervisorUser.usernameSup);
        } else {
          setSupervisor(undefined);
        }
        console.log(name);
      }
    };
    fetching();
  }, [dispatch, token]);

  const dataColor = {
    color: "dimgrey",
  };

  const dataElseColor = {
    color: "red",
  }

  const dataDesc = {
    fontWeight: "bold",
    marginRight: "10px",
  }

  return (
    <>
      <StudentTemplate>
      <div className="form-title-desc-container">Welcome to PostConnect</div>
        <Container>
          <Row style={{backgroundColor: '#f5f5f5', paddingBottom: '20px'}}>
            <Col className="mt-3">
              <Row>
                <Col xs={3}>
                  <img className="profileCentering roundImg" src="/image/student.png" alt="React Image" height={90} width={90} />
                </Col>
                <Col>
                  <div className="mt-4">
                    <span className="profileText">{`Hi, I am ${name}`}</span>
                    <span className="profileText mt-2" style={{fontSize: '12px'}}>
                      <span className="profileText profileTextDot"></span>
                      Online
                    </span>
                  </div>
  
                </Col>
              </Row>
            </Col>
            <Col>
              <div className="mt-4">
                <span className="profileText">
                  <span style={dataDesc}>Date Joined:</span>
                  <span style={dataColor}>{`${moment(dateJoined).format('DD/MM/YY')}`}</span>
                </span>
                <span className="profileText">
                  <span style={dataDesc}>Supervisor:</span>
                    {supervisor ? 
                      <span style={dataColor}>
                        {supervisor}
                      </span> : 
                      <span style={dataElseColor}>Have not been assigned</span>}
                  </span>
                <span className="profileText">
                  <span style={dataDesc}>Degree Lvl:</span>
                  <span style={dataColor}>{degreeLvl}</span>
                </span>
                <span className="profileText">
                  <span style={dataDesc}>Academic Status:</span>
                  <span style={dataColor}>Active</span>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </StudentTemplate>
    </>
  )
}

export default StudentViewProfile
