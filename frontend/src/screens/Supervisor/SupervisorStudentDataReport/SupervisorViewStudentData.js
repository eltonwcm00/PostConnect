import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { supervisorViewStudentData  } from "../../../actions/supervisorAction";
import { BASE_URL } from "../../../urlPath";
import { Button } from "react-bootstrap";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import PaginationBar from "../../../components/PaginationBar";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SupervisorTemplate from "../../../components/SupervisorTemplate";

const SupervisorViewStudentData = () => {
  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let index = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const supervisorLogin = useSelector((state) => state.supervisorLogin);
  const { supervisorInfo } = supervisorLogin;

  const studentListRead = useSelector((state) => state.facultyReadChooseStudent);
  const { loading, error, fetchStudentList } = studentListRead;

  useEffect(() => {
    dispatch(supervisorViewStudentData());
    if (!supervisorInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, supervisorInfo,]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <SupervisorTemplate>
        <div className="form-title-desc-container">View Student Data</div>
        {console.log(fetchStudentList)}
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <CDBContainer style={{padding: '0px', textAlign: "center", marginTop: "15px"}} className="list-container">
            <CDBTable borderless>
              <CDBTableHeader>
                <tr className='table-desc'>
                  <th>No.</th>
                  <th>Date Joined</th>
                  <th>Student</th>
                  <th>Degree Level</th>
                  <th>Supervisor</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </CDBTableHeader>
              <CDBTableBody>
              {
                fetchStudentList && 
                  fetchStudentList.slice(startIndex, endIndex).map((list) => (
                    <tr className='table-desc' key={list._id}>
                      <td> {index++} </td>
                      <td> {moment(list.studID.dateJoin).format('DD/MM/YYYY')} </td>
                      <td> {list.studID.usernameStud} </td>
                      <td> {list.studID.degreeLvl} </td>
                      <td> {list.supID ? list.supID.usernameSup : '-' } </td>
                      <td> {list.studID.isStudent ? "Active" : "Terminated"} </td>
                      <td className='table-details-button'><Button href={`${BASE_URL}facultyViewStudentData/${list._id}`}>Details</Button></td>
                    </tr>           
                )   
               ) 
              }
            </CDBTableBody>
          </CDBTable>
        </CDBContainer>
        {
          fetchStudentList && (
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              count={fetchStudentList.length}
            />
          )
        }
      </SupervisorTemplate>
    </>
  )
}

export default SupervisorViewStudentData;
