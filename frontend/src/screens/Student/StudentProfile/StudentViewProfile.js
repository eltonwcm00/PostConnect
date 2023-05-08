import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { studentProfile } from "../../../actions/studentAction";
import StudentTemplate from "../../../components/StudentTemplate";

const StudentViewProfile = () => {
  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const studentLoginState = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLoginState;
  const studentProfileState = useSelector((state) => state.studentProfile);
  const { studentProfileList } = studentProfileState ;

  useEffect(() => {
    if (!studentInfo) {
      navigate('/');
    }
  }, [navigate, studentInfo]);

  useEffect(() => {
    dispatch(studentProfile());
  }, []);

  return (
    <>
      <StudentTemplate>
      <div className="form-title-desc-container">Welcome to PostConnect</div>
        <Container>
          <Row style={{backgroundColor: '#f5f5f5', paddingBottom: '20px'}}>
            {
              studentProfileList && studentProfileList.map((list) => (
                <Col className="mt-3">
                  <Row>
                    <Col xs={3}>
                      <img className="profileCentering roundImg" src="/image/student.png" alt="React Image" height={90} width={90} />
                    </Col>
                    <Col>
                      <div key={list._id} className="mt-4">
                        <span className="profileText">{`Hi, I am ${list.userNameStud}`}</span>
                        <span className="profileText mt-2" style={{fontSize: '12px'}}>
                          <span className="profileText profileTextDot"></span>
                          Online
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))
            }
            <Col>
              <div className="mt-4">
                {/* <span className="profileText">You have processed the result for,</span>
                <ul className="mt-2 profileText" style={{display: 'inline-block', fontSize: '12px'}}>
                  <li>{`Research Proposal Defence : ${numRPD}`}</li>
                  <li>{`Work Completion Defence : ${numWCD}`}</li>
                  <li>{`Progress Report : ${numPR}`}</li>
                </ul>  */}
                ...
              </div>
            </Col>
          </Row>
        </Container>
      </StudentTemplate>
    </>
  )
}

export default StudentViewProfile
