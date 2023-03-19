import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import moment from 'moment';
import { Button } from "react-bootstrap";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { facultyReadEvaluateRPDApplication } from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import FacultyTemplate from "../../../components/FacultyTemplate";
import "./FacultyEvaluateRPDApplication.css";

const FacultyEvaluateRPDApplication = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const facultyLogin = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLogin;

    const RPDApplicationList = useSelector((state) => state.facultyReadApplication);
    const { loading, error, fetchApplicationList } = RPDApplicationList;

    useEffect(() => {
        dispatch(facultyReadEvaluateRPDApplication());
        if (!facultyInfo) {
          navigate("/");
        }
      }, [dispatch, navigate, facultyInfo,]);

  return (
    <>
      <FacultyTemplate>
        {console.log(RPDApplicationList)}
        {loading && <Loading />}
          <CDBContainer>
            <CDBTable borderless>
              <CDBTableHeader>
                <tr className='table-desc'>
                  <th>Date</th>
                  <th>Full Name</th>
                  <th>Mini Thesis Title</th>
                  <th>Status</th>
                  <th>Evaluate</th>
                </tr>
              </CDBTableHeader>
              <CDBTableBody>
              {
                fetchApplicationList && fetchApplicationList.map((list) => (
                    <tr className='table-desc' key={list._id}>
                      <td> {moment(list.dateApplyRPD).format('l')} </td>
                      <td> {list.fullName} </td>
                      <td> {list.miniThesisTitle} </td>
                      <td> {!list.applicationStatus ? "Pending" : "Process" } </td>
                      <td className='table-details-button'><Button href={`http://localhost:3000/facultyAssignNumSupervisor/${list._id}`}>Evaluate</Button></td>
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

export default FacultyEvaluateRPDApplication