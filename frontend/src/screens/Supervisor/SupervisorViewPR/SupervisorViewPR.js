import React, { useEffect } from 'react';
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import { CDBContainer, CDBTable, CDBTableHeader, CDBTableBody } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { supervisorReadPRResult } from "../../../actions/supervisorAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SupervisorTemplate from "../../../components/SupervisorTemplate";

const SupervisorViewPR = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const supervisorLogin = useSelector((state) => state.supervisorLogin);
  const { supervisorInfo } = supervisorLogin;
  
  const supervisorReadRPDState = useSelector((state) => state. supervisorReadCW);
  const { loading, cwInfoSuccess, cwInfoFail } = supervisorReadRPDState;

  useEffect(() => {
      dispatch(supervisorReadPRResult());
      if (!supervisorInfo) {
        navigate("/");
      }
  }, [dispatch, navigate, supervisorInfo,]);

  return (
    <SupervisorTemplate>
        {console.log(cwInfoSuccess)}
        { loading && <Loading/> }
        { cwInfoFail && <ErrorMessage variant="danger">{cwInfoFail.message}</ErrorMessage> }
        <CDBContainer style={{padding: '0px', textAlign: "center", marginTop: "15px"}} className="list-container">
              <CDBTable borderless>
                <CDBTableHeader className="d-flex p-2 table-header">
                  <tr className='table-desc'>
                    <th className="table-desc-th">Date</th>
                    <th className="table-desc-th">Full Name</th>
                    <th className="table-desc-th">Grade</th>
                    <th className="table-desc-th">Status</th>
                    {/* <th className="table-desc-th">Retry Attempt</th> */}
                  </tr>
                </CDBTableHeader>
                <CDBTableBody>
                  {
                    cwInfoSuccess && cwInfoSuccess.map((list) => (
                        <tr className='table-desc' key={list._id}>
                          <td> {moment(list.updatedAt).format('L')} </td>
                          <td> {list.studentUser && list.studentUser.usernameStud} </td>
                          <td> {list.status ? 'S' : 'US' } </td>
                          <td> {list.status ? 'Passed' : 'Failed' } </td>
                          {/* <td> {list.studentRef.retryRPDAttempt} </td> */}
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

export default SupervisorViewPR
