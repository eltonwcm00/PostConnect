import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { Container, Form, Button, Row, Col, Tab, Tabs } from "react-bootstrap";
import { CDBContainer, CDBTable, CDBTableHeader, CDBTableBody } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { facultyViewOwnProfile } from "../../../actions/facultyAction";
import { panelProfile } from "../../../actions/panelAction";
import { supervisorProfile } from "../../../actions/supervisorAction";
import { studentProfile } from "../../../actions/studentAction";
import FacultyTemplate from "../../../components/FacultyTemplate";
import PaginationBar from "../../../components/PaginationBar";
import "./FacultyProfile.css"

const FacultyViewProfile = () => {
 
    let navigate = useNavigate();
    let indexStud = 1, indexSup = 1, indexPanel = 1;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [numPanel, setNumPanel] = useState();
    const [numSupervisor, setNumSupervisor] = useState();
    const [numStudent, setNumStudent] = useState();

    const [passwordType, setPasswordType] = useState("password");

    const dispatch = useDispatch();

    const facultyProfileState = useSelector((state) => state.facultyProfile);
    const { fetchProfile } = facultyProfileState;
    const panelProfileState = useSelector((state) => state.panelProfile);
    const { panelProfileList } = panelProfileState;
    const supervisorProfileState = useSelector((state) => state.supervisorProfile);
    const { supervisorProfileList } = supervisorProfileState;
    const studentProfileState = useSelector((state) => state.studentProfile);
    const { studentProfileList } = studentProfileState ;

    const facultyLoginState = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLoginState;


    useEffect(() => {
      if (!facultyInfo) {
        navigate('/');
      }
    }, [navigate, facultyInfo]);
    
    useEffect(() => {
      dispatch(facultyViewOwnProfile());
      dispatch(panelProfile());
      dispatch(supervisorProfile());
      dispatch(studentProfile());
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

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

    const togglePass = () => {
      if(passwordType === "password") {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

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
            <Col xs={3} style={{padding: 0}}>
              <div className="profileEditText">Profile Info.</div>
              <Form className="form" style={{boxShadow: "none"}}>
              {
                fetchProfile && fetchProfile.map((list) => (
                  <Form.Group className="mb-5" controlId="title">
                    <Form.Label column sm={2}>Username</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="null"
                            value={list.userNameFac}
                            disabled
                            // onChange={(e) => setFullName(e.target.value)}
                        />
                    </Col>
                  </Form.Group>
                ))
              }
                <Form.Group className="mb-5" controlId="title">
                  <Form.Label column sm={2}>Password</Form.Label>
                  <Col sm={10}>
                      {
                        facultyInfo && 
                         <>
                          <Form.Control
                              type={passwordType}
                              placeholder="null"
                              value={facultyInfo.password}
                              disabled
                              // onChange={(e) => setFullName(e.target.value) 
                          />
                          <Form.Check 
                            type='checkbox'
                            className="float-right mt-2"
                            label="Show Password"
                            onChange={togglePass}
                          />
                        </>
                      }
                  </Col>
                </Form.Group>
              </Form>
            </Col>

            <Col style={{padding: 0}}>
              <div className="profileEditText">Edit Profile</div>
              <Tabs defaultActiveKey="Student" id="fill-tab-example" className="mb-3 tab mt-4" justify transition={false}>
              <Tab eventKey="Student" title="Student">
                  <CDBContainer style={{padding: '0', textAlign: "center"}}>
                    <CDBTable borderless>
                    <CDBTableHeader>
                      <tr className='table-desc'>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Date Joined</th>
                        <th>Degree Lvl</th>
                        <th>{}</th>
                      </tr>
                    </CDBTableHeader>
                      <CDBTableBody>
                        {
                          studentProfileList && 
                            studentProfileList.slice(startIndex, endIndex).map((list) => (
                            <tr className="table-desc" key={list._id}>
                              <td> {indexStud++} </td>
                              <td> {list.usernameStud} </td>
                              <td> {moment(list.dateJoin).format("DD/MM/YYYY")} </td>
                              <td> {list.degreeLvl} </td>
                              <td className="table-details-button">
                                <Button href={`http://localhost:3000/studentProfileList/${list._id}`}>Edit</Button>
                              </td>
                            </tr>
                          ))
                        }
                      {console.log(studentProfileList)}
                      </CDBTableBody>
                    </CDBTable>
                  </CDBContainer>
                  {
                    studentProfileList && (
                      <PaginationBar
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        count={studentProfileList.length}
                      />
                    )
                  }
                </Tab>
                <Tab eventKey="Supervisor" title="Supervisor">
                  <CDBContainer style={{padding: '20px 0', textAlign: "center"}}>
                    <CDBTable borderless>
                      <CDBTableHeader>
                        <tr className='table-desc'>
                          <th>No.</th>
                          <th>Name</th>
                          <th>Academic Position</th>
                          <th>{}</th>
                        </tr>
                      </CDBTableHeader>
                      <CDBTableBody>
                      {
                        supervisorProfileList && 
                          supervisorProfileList.map((list) => (
                          <tr className="table-desc" key={list._id}>
                            <td> {indexSup++} </td>
                            <td> {list.usernameSup} </td>
                            <td> {list.academicPos} </td>
                            <td className="table-details-button">
                              <Button href={`http://localhost:3000/supervisorProfileList/${list._id}`}>Edit</Button>
                            </td>
                          </tr>
                        ))
                      }
                      {console.log(panelProfileList)}
                      </CDBTableBody>
                    </CDBTable>
                  </CDBContainer>
                </Tab>
                <Tab eventKey="Panel" title="Panel">
                  <CDBContainer style={{padding: '20px 0', textAlign: "center"}}>
                    <CDBTable borderless>
                      <CDBTableHeader>
                        <tr className='table-desc'>
                          <th>No.</th>
                          <th>Name</th>
                          <th>{}</th>
                        </tr>
                      </CDBTableHeader>
                      <CDBTableBody>
                      {
                        panelProfileList && panelProfileList.map((list) => (
                          <tr className="table-desc" key={list._id}>
                            <td> {indexPanel++} </td>
                            <td> {list.usernamePanel} </td>
                            <td className="table-details-button">
                              <Button href={`http://localhost:3000/panelProfileList/${list._id}`}>Edit</Button>
                            </td>
                          </tr>
                        ))
                      }
                      {console.log(panelProfileList)}
                      </CDBTableBody>
                    </CDBTable>
                  </CDBContainer>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>  
      </FacultyTemplate>
    </>
  )
}

export default FacultyViewProfile
