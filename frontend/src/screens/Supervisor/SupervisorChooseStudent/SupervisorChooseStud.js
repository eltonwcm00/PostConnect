import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { supervisorReadChooseStudent } from "../../../actions/supervisorAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SupervisorTemplate from "../../../components/SupervisorTemplate";
import "./SupervisorChooseStud.css";

const SupervisorChooseStud = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    let index = 1; 

    const supervisorLogin = useSelector((state) => state.supervisorLogin);
    const { supervisorInfo } = supervisorLogin;

    const studentList = useSelector((state) => state.supervisorReadChooseStudent);
    const { loading, error, fetchStudentList } = studentList;

    useEffect(() => {
        dispatch(supervisorReadChooseStudent());
        if (!supervisorInfo) {
          navigate("/");
        }
      }, [dispatch, navigate, supervisorInfo,]);

  return (
    <>
      <SupervisorTemplate>
        <div className="form-title-desc-container">List of The Supervisors</div>
        {console.log(fetchStudentList)}
        {loading && <Loading />}
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
                      <td> {list.dateJoin} </td>
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
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      </SupervisorTemplate>
    </>
  )
}

export default SupervisorChooseStud
