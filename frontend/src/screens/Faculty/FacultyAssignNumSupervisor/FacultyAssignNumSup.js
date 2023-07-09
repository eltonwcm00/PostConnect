import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { facultyReadAssignSupervision } from "../../../actions/facultyAction";
import { BASE_URL } from "../../../urlPath";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "./FacultyAssignNumSup.css";

const FacultyAssignNumSupervisor = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    let index = 1; 

    const facultyLogin = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLogin;

    const supervisorList = useSelector((state) => state.facultyReadAssignSupervision);
    const { loading, error, fetchSupervisorList } = supervisorList;

    useEffect(() => {
        dispatch(facultyReadAssignSupervision());
        if (!facultyInfo) {
          navigate("/");
        }
      }, [dispatch, navigate, facultyInfo,]);

  return (
    <>
      <FacultyTemplate>
        <div className="form-title-desc-container">List of The Supervisors</div>
        {console.log(fetchSupervisorList)}
        {loading && <Loading />}
          <CDBContainer style={{padding: '0px', textAlign: "center", marginTop: "15px"}} className="list-container">
            <CDBTable borderless>
              <CDBTableHeader>
                <tr className='table-desc'>
                  <th>No.</th>
                  <th>Username</th>
                  <th>Academic Position</th>
                  <th>Number of Supervision</th>
                  <th>Action</th>
                </tr>
              </CDBTableHeader>
              <CDBTableBody>
              {
                fetchSupervisorList && fetchSupervisorList.map((list) => (
                    <tr className='table-desc' key={list._id}>
                      <td> {index++} </td>
                      <td> {list.usernameSup} </td>
                      <td> {list.academicPos} </td>
                      <td> {list.numSupervision} </td>
                      <td><Button className='table-details-button' href={`${BASE_URL}facultyAssignNumSupervisor/${list._id}`}>Details</Button></td>
                    </tr>
                  )
                )
              }
            </CDBTableBody>
            </CDBTable>
          </CDBContainer>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      </FacultyTemplate>
    </>
  )
}

export default FacultyAssignNumSupervisor
