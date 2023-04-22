import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { CDBContainer, CDBTable, CDBTableHeader, CDBTableBody } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { supervisorReadPR } from "../../../actions/supervisorAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SupervisorTemplate from "../../../components/SupervisorTemplate";
import ViewPDF from "../../../components/ViewPDF";

const SupervisorEvaluatePR = () => {
    
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const supervisorLogin = useSelector((state) => state.supervisorLogin);
    const { supervisorInfo } = supervisorLogin;

    const PRList = useSelector((state) => state.supervisorReadCW);
    const { loading, cwInfoSuccess, cwInfoFail } = PRList;

    useEffect(() => {
        dispatch(supervisorReadPR());
        if (!supervisorInfo) {
          navigate("/");
        }
    }, [dispatch, navigate, supervisorInfo,]);

    return (
        <>
            {loading && <Loading />}
            {cwInfoFail && <ErrorMessage variant="danger">{cwInfoFail}</ErrorMessage>}
            <SupervisorTemplate>
                <CDBContainer style={{padding: '0px', textAlign: "center"}} className="list-container">
                <CDBTable borderless>
                    <CDBTableHeader className="d-flex p-2 table-header">
                    <tr className='table-desc'>
                        <th className="table-desc-th">Submission Date</th>
                        <th className="table-desc-th">Full Name</th>
                        <th className="table-desc-th">Evaluation</th>
                    </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                    {
                        cwInfoSuccess && cwInfoSuccess.filter(x =>(!x.supervisorUser)).map((list) => (
                                <tr className='table-desc' key={list._id}>
                                <td> {moment(list.dateSubmitPR).format('MMMM Do YYYY')} </td>
                                <td> {list.studentUser.usernameStud} </td>
                                <td><Button className='table-details-button' href={`http://localhost:3000/supervisorEvaluatePR/${list._id}`}>Evaluate</Button></td>
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

export default SupervisorEvaluatePR
