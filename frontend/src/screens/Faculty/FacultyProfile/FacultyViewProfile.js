import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { facultyViewOwnProfile } from "../../../actions/facultyAction";
import FacultyTemplate from "../../../components/FacultyTemplate";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import "./FacultyProfile.css"

const FacultyViewProfile = () => {
 
    let navigate = useNavigate();
    const [numPanel, setNumPanel] = useState();
    const [numSupervisor, setNumSupervisor] = useState();
    const [numStudent, setNumStudent] = useState();


    const dispatch = useDispatch();

    const facultyProfileState = useSelector((state) => state.facultyProfile);
    const { loading, error, fetchProfile, successMsg } = facultyProfileState;

    useEffect(() => {
      dispatch(facultyViewOwnProfile());
      console.log(fetchProfile);
    }, []);

    useEffect(() => {
      const fetching = async () => {
          const { data } = await axios.get('http://localhost:5000/api/faculty/facultyProfileCountPanel');
          setNumPanel(data);
      };
      fetching();
    }, []);

    useEffect(() => {
      const fetching = async () => {
          const { data } = await axios.get('http://localhost:5000/api/faculty/facultyProfileCountSupervisor');
          setNumSupervisor(data);
      };
      fetching();
    }, []);

    useEffect(() => {
      const fetching = async () => {
          const { data } = await axios.get('http://localhost:5000/api/faculty/facultyProfileCountStudent');
          setNumStudent(data);
      };
      fetching();
    }, []);

  return (
    <>
      <FacultyTemplate>
      <div className="form-title-desc-container">Welcome to PostConnect</div>
        <Container>
          <Row style={{backgroundColor: '#f5f5f5'}}>
            {
              fetchProfile && fetchProfile.map((list) => (
                <Col className="mt-3">
                  <Row>
                    <Col xs={3}>
                      <img className="profileCentering roundImg" src="/image/school.png" alt="React Image" height={90} width={90} />
                    </Col>
                    <Col>
                      <div key={list._id} className="mt-4">
                        <span className="profileText">{`Hi, I am ${list.userNameFac}`}</span>
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
            <Col style={{backgroundColor: '#e2eff1'}}>
              <Row className="mt-3 mb-3">
                <Col className="profileText">
                  <img className="profileCentering roundImg" src="/image/marking.png" alt="React Image" height={60} width={60} />  
                  <span className="profileCentering">{numPanel}</span>
                  <span className="profileCentering">Panel</span>
                </Col>
                <Col className="profileText">
                  <img className="profileCentering roundImg" src="/image/teacher.png" alt="React Image" height={60} width={60} />  
                  <span className="profileCentering">{numSupervisor}</span>
                  <span className="profileCentering">Supervisor</span>
                </Col>
                <Col className="profileText">
                  <img className="profileCentering roundImg" src="/image/student.png" alt="React Image" height={60} width={60} />  
                  <span className="profileCentering">{numStudent}</span>
                  <span className="profileCentering">Student</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col style={{padding: 0}}>
              <div className="profileEditText">Edit Profile</div>
              <Form className="form" style={{boxShadow: "none"}}>
                <Form.Group as={Row} className="mb-5" controlId="title">
                  <Form.Label column sm={2}>Username</Form.Label>
                  <Col sm={10}>
                      <Form.Control
                          type="text"
                          placeholder="null"
                          // value={fullName}
                          // onChange={(e) => setFullName(e.target.value)}
                      />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-5" controlId="title">
                  <Form.Label column sm={2}>Password</Form.Label>
                  <Col sm={10}>
                      <Form.Control
                          type="password"
                          placeholder="null"
                          // value={fullName}
                          // onChange={(e) => setFullName(e.target.value)}
                      />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-5" controlId="title">
                  <Form.Label column sm={2}>Confirm Password</Form.Label>
                  <Col sm={10}>
                      <Form.Control
                          type="text"
                          placeholder="null"
                          // value={fullName}
                          // onChange={(e) => setFullName(e.target.value)}
                      />
                  </Col>
                </Form.Group>
                <Button className="table-details-button profileCentering"variant="primary">
                                            Update
                                        </Button>
              </Form>
            </Col>
            <Col style={{padding: 0}}>
            <div className="profileEditText">Hello</div>
              <Form className="form" style={{boxShadow: "none"}}>
                <Form.Group as={Row} className="mb-5" controlId="title">
                  <Form.Label column sm={2}>Username</Form.Label>
                  <Col sm={10}>
                      <Form.Control
                          type="text"
                          placeholder="null"
                          // value={fullName}
                          // onChange={(e) => setFullName(e.target.value)}
                      />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-5" controlId="title">
                  <Form.Label column sm={2}>Password</Form.Label>
                  <Col sm={10}>
                      <Form.Control
                          type="password"
                          placeholder="null"
                          // value={fullName}
                          // onChange={(e) => setFullName(e.target.value)}
                      />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-5" controlId="title">
                  <Form.Label column sm={2}>Confirm Password</Form.Label>
                  <Col sm={10}>
                      <Form.Control
                          type="text"
                          placeholder="null"
                          // value={fullName}
                          // onChange={(e) => setFullName(e.target.value)}
                      />
                  </Col>
                </Form.Group>
                <Button className="table-details-button profileCentering"variant="primary">
                                            Update
                                        </Button>
                </Form>
            </Col>
          </Row>
        </Container>  
      </FacultyTemplate>
    </>
  )
}

export default FacultyViewProfile
