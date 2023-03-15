import React, { useEffect, useState } from "react";
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

    let navigate = useNavigate();
    let index = 1; 

    let [chooseCount, setChooseCount] = useState(0);

    const supervisorLogin = useSelector((state) => state.supervisorLogin);
    const { supervisorInfo } = supervisorLogin;

    const studentListRead = useSelector((state) => state.supervisorReadChooseStudent);
    const { loading, error, fetchStudentList } = studentListRead;
    
    const studentListUpdate = useSelector((state) => state.supervisorUpdateChooseStudent);
    const { successMsg, fetchStudent, error2 } = studentListUpdate;

    useEffect(() => {
        dispatch(supervisorReadChooseStudent());
        if (!supervisorInfo) {
          navigate("/");
        }
    }, [dispatch, navigate, supervisorInfo,]);

    const selectStudent = (id, numAssignedSupervision) => {
        if (window.confirm("Are you sure?")) {
            setChooseCount(chooseCount + 1);
            console.log(chooseCount);
            dispatch(supervisorUpdateChooseStudent(id, numAssignedSupervision));
        }
    }

    useEffect(() => {
        if (successMsg) {
          const timer = setTimeout(() => {
            navigate('/supervisorReadChooseStudent');
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [navigate, successMsg])

  return (
    <>
      <SupervisorTemplate>
        <div className="form-title-desc-container">List of The Student Ready To Be Supervised</div>
        {console.log(fetchStudentList)}
        {loading && <Loading />}
        {successMsg && <SuccessMessage variant="success">{fetchStudent.successMessage}</SuccessMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {error2 && <ErrorMessage variant="danger">{error2}</ErrorMessage>}
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
                // visibleStudent &&
                fetchStudentList && fetchStudentList.filter(x => x.supervisorUser == null).map((list) => (
                    <tr className='table-desc' key={list._id}>
                      <td> {index++} </td>
                      <td> {list.usernameStud} </td>
                      <td> {moment(list.dateJoin).format('MMMM d, YYYY')} </td>
                      <td> {list.degreeLvl} </td>
                      <td> {list.academicStatus} </td>
                      <td className='table-details-button'><Button onClick={() => selectStudent(list._id, chooseCount)}>Choose</Button></td>
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
