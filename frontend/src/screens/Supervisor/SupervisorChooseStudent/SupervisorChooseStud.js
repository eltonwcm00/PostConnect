import React, { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Button } from "react-bootstrap";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { supervisorReadChooseStudent, supervisorUpdateChooseStudent } from "../../../actions/supervisorAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import SupervisorTemplate from "../../../components/SupervisorTemplate";
import "./SupervisorChooseStud.css";

const SupervisorChooseStud = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    let navigate = useNavigate();
    let index = 1; 

    const supervisorLogin = useSelector((state) => state.supervisorLogin);
    const { supervisorInfo } = supervisorLogin;

    const studentListRead = useSelector((state) => state.supervisorReadChooseStudent);
    const { loading, error, fetchStudentList } = studentListRead;
    
    const studentListUpdate = useSelector((state) => state.supervisorUpdateChooseStudent);
    const {successMsg, fetchStudent } = studentListUpdate;

    useEffect(() => {
        dispatch(supervisorReadChooseStudent());
        if (!supervisorInfo) {
          navigate("/");
        }
    }, [dispatch, navigate, supervisorInfo,]);

    const selectStudent = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(supervisorUpdateChooseStudent(id));
        }
    }

  return (
    <>
      <SupervisorTemplate>
        <div className="form-title-desc-container">List of The Supervisors</div>
        {console.log(fetchStudentList)}
        {loading && <Loading />}
        {successMsg && <SuccessMessage variant="success">{fetchStudent.successMessage}</SuccessMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {}
          <CDBContainer>
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
                fetchStudentList && fetchStudentList.map((list) => (
                    <tr className='table-desc' key={list._id}>
                      <td> {index++} </td>
                      <td> {list.usernameStud} </td>
                      <td> {moment(list.dateJoin).format('MMMM d, YYYY')} </td>
                      <td> {list.degreeLvl} </td>
                      <td> {list.academicStatus} </td>
                      <td className='table-details-button'><Button onClick={() => selectStudent(list._id)}>Choose</Button></td>
                    </tr>           
                  )
                )   
              }
            </CDBTableBody>
            </CDBTable>
          </CDBContainer>
      </SupervisorTemplate>
    </>
  )
}

export default SupervisorChooseStud
