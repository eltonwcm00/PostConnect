import React, { useEffect } from 'react';
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import { Button} from "react-bootstrap";
import { CDBContainer, CDBTable, CDBTableHeader, CDBTableBody } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { supervisorReadMeetingLog } from "../../../actions/supervisorAction";
import { excerpt } from"../../../components/Excerpt";
import { BASE_URL } from '../../../urlPath';
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SupervisorTemplate from "../../../components/SupervisorTemplate";

const SupervisorViewMeetingLog = () => {
    
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const supervisorLogin = useSelector((state) => state.supervisorLogin);
    const { supervisorInfo } = supervisorLogin;
    
    const supervisorReadMeetingLogState = useSelector((state) => state. supervisorReadCW);
    const { loading, cwInfoSuccess, cwInfoFail } = supervisorReadMeetingLogState;

    useEffect(() => {
        dispatch(supervisorReadMeetingLog());
        if (!supervisorInfo) {
          navigate("/");
        }
    }, [dispatch, navigate, supervisorInfo,]);
  
    return (
    <SupervisorTemplate>
        {console.log(cwInfoSuccess)}
        { loading && <Loading/> }
        { cwInfoFail && <ErrorMessage variant="danger">{cwInfoFail}</ErrorMessage> }
        <div className="form-title-desc-container">Meeting Logs</div>
        <CDBContainer style={{padding: '0px', textAlign: "center", marginTop: "15px"}} className="list-container">
              <CDBTable borderless>
                <CDBTableHeader className="d-flex p-2 table-header">
                  <tr className='table-desc'>
                    <th className="table-desc-th">Date</th>
                    <th className="table-desc-th">Student</th>
                    <th className="table-desc-th">Content</th>
                    <th className="table-desc-th">Read More</th>
                  </tr>
                </CDBTableHeader>
                <CDBTableBody>
                  {
                    cwInfoSuccess && cwInfoSuccess.map((list) => (
                        <tr className='table-desc' key={list._id}>
                          <td> {moment(list.dateLog).format('l')} </td>
                          <td> {list.studentUser.usernameStud} </td>
                          {console.log(list.studentUser.usernameStud)}
                          <td> {excerpt(list.contentLog, 80, " ", "...")} </td>
                          <td><Button className='table-details-button' href={`${BASE_URL}supervisorViewMeetingLog/${list._id}`}>Details</Button></td>
                        </tr>
                      )
                    )
                  }
                </CDBTableBody>
              </CDBTable>
        </CDBContainer>
    </SupervisorTemplate>
  )
}

export default SupervisorViewMeetingLog
