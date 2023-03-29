import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { facultyReadChooseStudent,facultyReadAssignSupervision,facultyUpdateChooseStudent } from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "./FacultyChooseStud.css";

const FacultyChooseStud = () => {
  
  const dispatch = useDispatch();

  let navigate = useNavigate();
  let index = 1; 

  let [chooseCount, setChooseCount] = useState(0);

  const [supervisorList, setSupervisorList] = useState("");

  const facultyLogin = useSelector((state) => state.facultyLogin);
  const { facultyInfo } = facultyLogin;

  const studentListRead = useSelector((state) => state.facultyReadChooseStudent);
  const { loading, error, fetchStudentList } = studentListRead;

  const supervisorListRead = useSelector((state) => state.facultyReadAssignSupervision);
  const { fetchSupervisorList } = supervisorListRead;

  const studentListUpdate = useSelector((state) => state.facultyUpdateChooseStudent);
    const { successMsg, fetchStudent, error2 } = studentListUpdate;

  useEffect(() => {
    dispatch(facultyReadChooseStudent());
    if (!facultyInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, facultyInfo,]);
  useEffect(() => {
    dispatch(facultyReadAssignSupervision());
    if (!facultyInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, facultyInfo,]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(facultyPanelRegistration(usernamePanel, password, cfrmPassword));
    if (window.confirm("Are you sure?")) { 
      console.log(supervisorList);
    }
  };

  const selectStudent = (id, numAssignedSupervision, supervisorList) => {
    if (window.confirm("Are you sure?")) {
        setChooseCount(chooseCount + 1);
        console.log(chooseCount);
        dispatch(facultyUpdateChooseStudent(id, numAssignedSupervision, supervisorList));
    }
  };

  return (
    <FacultyTemplate>
      <div className="form-title-desc-container">List of Supervisor</div>
      <Form onSubmit={submitHandler}>
        <Row className="justify-content-md-center">
          <Col md="8">
            <Form.Select column sm aria-label="Default select example" 
              className="mt-5 mb-5" value={supervisorList} onChange={(e) => setSupervisorList(e.target.value)}>
              {
                fetchSupervisorList && fetchSupervisorList.map((list) => (
                    <option key={list._id} value={`${list._id}`}>{list.usernameSup}</option>           
                  )   
                )
              }       
            </Form.Select>
          </Col>
          <Col>
            <Button className=" mt-5" variant="primary" type="submit">
              Select
            </Button>
          </Col>
        </Row>
        </Form>
        <div className="form-title-desc-container">List of The Student Ready To Be Supervised</div>
        {console.log(fetchStudentList)}
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {successMsg && <SuccessMessage variant="success">{fetchStudent.successMessage}</SuccessMessage>}
        {error2 && <ErrorMessage variant="danger">{error2}</ErrorMessage>}
      
        <CDBContainer style={{padding: '0px', textAlign: "center", marginTop: "15px"}} className="list-container">
            <CDBTable borderless>
              <CDBTableHeader>
                <tr className='table-desc'>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Date Joined</th>
                  <th>Degree Level</th>
                  <th>Academic Status</th>
                  <th>Action</th>
                </tr>
              </CDBTableHeader>
              <CDBTableBody>
              {
                fetchStudentList && fetchStudentList.filter(x => x.supervisorUser == null).map((list) => (
                    <tr className='table-desc' key={list._id}>
                      <td> {index++} </td>
                      <td> {list.usernameStud} </td>
                      <td> {moment(list.dateJoin).format('MMMM d, YYYY')} </td>
                      <td> {list.degreeLvl} </td>
                      <td> {list.academicStatus} </td>
                      <td className='table-details-button'><Button onClick={() => selectStudent(list._id, chooseCount, supervisorList)}>Choose</Button></td>
                    </tr>           
                )   
               ) 
              }
            </CDBTableBody>
            </CDBTable>
          </CDBContainer>
    </FacultyTemplate>
  )
}

export default FacultyChooseStud
