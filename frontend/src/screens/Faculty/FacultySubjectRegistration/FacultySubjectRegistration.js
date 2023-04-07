import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { facultyReadSubjectStudent } from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";

const FacultySubjectRegistration = () => {
  
    const dispatch = useDispatch();
    let navigate = useNavigate();

    let index = 1; 

    const facultyLogin = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLogin;

    const studentListRead = useSelector((state) => state.facultyReadChooseStudent);
    const { loading, error, fetchStudentList } = studentListRead;

    useEffect(() => {
        dispatch(facultyReadSubjectStudent());
        if (!facultyInfo) {
          navigate("/");
        }
      }, [dispatch, navigate, facultyInfo,]);

  return (
    <>
      <FacultyTemplate>
      <div className="form-title-desc-container">List of The Student With Passed Subjects</div>
        {console.log(fetchStudentList)}
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <CDBContainer style={{padding: '0px', textAlign: "center", marginTop: "15px"}} className="list-container">
            <CDBTable borderless>
              <CDBTableHeader>
                <tr className='table-desc'>
                  <th>No.</th>
                  <th>Student</th>
                  <th>Subject A</th>
                  <th>Subject B</th>
                  <th>Action</th>
                </tr>
              </CDBTableHeader>
              <CDBTableBody>
              {
                fetchStudentList && fetchStudentList.map((list) => (
                    <tr className='table-desc' key={list._id}>
                      <td> {index++} </td>
                      <td> {list.usernameStud} </td>
                      <td> {"Data Structure and Algorithm"} </td>
                      <td> {"Web App Development with MERN Stack"} </td>
                      <td className='table-details-button'><Button href={`http://localhost:3000/facultySubjectRegistration/${list._id}`}>Assign</Button></td>
                    </tr>           
                )   
               ) 
              }
            </CDBTableBody>
            </CDBTable>
          </CDBContainer>
      </FacultyTemplate>
    </>
  )
}

export default FacultySubjectRegistration
