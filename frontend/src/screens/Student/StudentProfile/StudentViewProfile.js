import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_2 } from "../../../urlPath";
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

  const [passSubjectA, setPassSubjectA] = useState();
  const [passSubjectB, setPassSubjectB] = useState();
  const [passRPD, setPassRPD] = useState();
  const [passWCD, setPassWCD] = useState();
  const [passPR, setPassPR] = useState();

  useEffect(() => {
    const fetching = async () => {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${BASE_URL_2}api/student/studentViewOwnProfile`,
          config
        );

        setName(data.fetchCurrentStudent.usernameStud);
        setDateJoined(data.fetchCurrentStudent.dateJoin);
        setDegreeLvl(data.fetchCurrentStudent.degreeLvl);
        
        if (data.fetchCurrentStudent.supervisorUser && data.fetchCurrentStudent.supervisorUser.usernameSup) {
          setSupervisor(data.fetchCurrentStudent.supervisorUser.usernameSup);
        } else {
          setSupervisor(undefined);
        }

        setPassSubjectA(!data.fetchCurrentStudent.subjectA ? "-" : "Passed");
        setPassSubjectB(!data.fetchCurrentStudent.subjectB ? "-" : "Passed");
       
        function getStatusValue(status) {
          if (status === undefined || status === null) {
            return "-";
          } else {
            return status ? "Passed" : "Failed";
          }
        }
        
        setPassRPD(getStatusValue(data.fetchCurrentStudentRPD && data.fetchCurrentStudentRPD.status));
        setPassWCD(getStatusValue(data.fetchCurrentStudentWCD && data.fetchCurrentStudentWCD.status));
        setPassPR(getStatusValue(data.fetchCurrentStudentPR && data.fetchCurrentStudentPR.status));        
        
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
                <h4 className="profileSummaryHeader">Summary</h4>
                <span className="profileText mt-4">
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
                  <span style={dataDesc}>Subject A:</span>
                  <span style={dataColor}>{passSubjectA}</span>
                </span>
                <span className="profileText">
                  <span style={dataDesc}>Subject B:</span>
                  <span style={dataColor}>{passSubjectB}</span>
                </span>
                <span className="profileText">
                  <span style={dataDesc}>Research Proposal Defence:</span>
                  <span style={dataColor}>{passRPD}</span>
                </span>
                <span className="profileText">
                  <span style={dataDesc}>Work Completion Defence:</span>
                  <span style={dataColor}>{passWCD}</span>
                </span>
                <span className="profileText">
                  <span style={dataDesc}>Progress Report:</span>
                  <span style={dataColor}>{passPR}</span>
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
