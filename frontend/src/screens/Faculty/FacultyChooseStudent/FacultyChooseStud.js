import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { facultyReadChooseStudent } from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "./FacultyChooseStud.css";

const FacultyChooseStud = () => {
  
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let index = 1; 

  const [supervisorList, setSupervisorList] = useState("");

  const facultyLogin = useSelector((state) => state.facultyLogin);
  const { facultyInfo } = facultyLogin;

  const studentListRead = useSelector((state) => state.facultyReadChooseStudent);
  const { loading, error, fetchStudentList } = studentListRead;

  useEffect(() => {
    dispatch(facultyReadChooseStudent());
    if (!facultyInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, facultyInfo,]);
  
  const submitHandler = () => {

  }

  return (
    <FacultyTemplate>
      <Form className="form" onSubmit={submitHandler}>
          <Form.Select column sm aria-label="Default select example" value={supervisorList} onChange={(e) => setSupervisorList(e.target.value)}>
                    <option>Which supervisor would like to be assigned with student supervision</option>
                    <option value="Master Degree (Part-Time)">Master Degree (Part-Time)</option>
                    <option value="Master Degree (Full-Time)">Master Degree (Full-Time)</option>
                    <option value="Doctoral Degree (Part-Time)">Doctoral Degree (Part-Time)</option>
                    <option value="Doctoral Degree (Full-Time)">Doctoral Degree (Full-Time)</option>
          </Form.Select>
        </Form>
        <div className="form-title-desc-container">List of The Student Ready To Be Supervised</div>
        {console.log(fetchStudentList)}
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      
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
                      <td className='table-details-button'><Button>Choose</Button></td>
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
