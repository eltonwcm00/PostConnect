import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import moment from 'moment';
import { Button, Tab, Tabs } from "react-bootstrap";
import { CDBContainer, CDBTable, CDBTableHeader, CDBTableBody } from 'cdbreact';
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
        <Tabs defaultActiveKey="pending" id="fill-tab-example" className="mb-3 tab mt-4" justify transition={false}>
          <Tab eventKey="pending" title="Pending">
            <CDBContainer style={{padding: '0px', textAlign: "center"}} className="list-container">
              <CDBTable borderless>
                <CDBTableHeader className="d-flex p-2 table-header">
                  <tr className='table-desc'>
                    <th className="table-desc-th">Date</th>
                    <th className="table-desc-th">Full Name</th>
                    <th className="table-desc-th">Mini Thesis Title</th>
                    <th className="table-desc-th">Status</th>
                    <th className="table-desc-th">Evaluate</th>
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
                          <td><Button className='table-details-button' href={`http://localhost:3000/facultyEvaluateRPDApplication/${list._id}`}>Details</Button></td>
                        </tr>
                      )
                    )
                  }
                </CDBTableBody>
              </CDBTable>
            </CDBContainer>
          </Tab>
          <Tab eventKey="processed" title="Processed">
              Test
          </Tab>
        </Tabs>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      </FacultyTemplate>
    </>
  )
}

export default FacultyEvaluateRPDApplication