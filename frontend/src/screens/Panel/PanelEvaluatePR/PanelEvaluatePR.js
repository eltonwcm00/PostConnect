import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { CDBContainer, CDBTable, CDBTableHeader, CDBTableBody } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { panelReadPR } from "../../../actions/panelAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import PanelTemplate from "../../../components/PanelTemplate";
import ViewPDF from "../../../components/ViewPDF";

// import "./FacultyEvaluateRPDApplication.css";

const PanelEvaluatePR = () => {
    
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const panelLogin = useSelector((state) => state.panelLogin);
    const { panelInfo } = panelLogin;

    const PRList = useSelector((state) => state.panelReadApplication);
    const { loading, errorApplicationList, fetchApplicationList } = PRList;

    useEffect(() => {
        dispatch(panelReadPR());
        if (!panelInfo) {
          navigate("/");
        }
    }, [dispatch, navigate, panelInfo,]);

    return (
        <>
            {loading && <Loading />}
            {errorApplicationList && <ErrorMessage variant="danger">{errorApplicationList.errorRPDList}</ErrorMessage>}
            <PanelTemplate>
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
                        fetchApplicationList && fetchApplicationList.filter(x =>(x.grade == 0)).map((list) => (
                                <tr className='table-desc' key={list._id}>
                                <td> {moment(list.dateSubmitPR).format('MMMM Do YYYY')} </td>
                                <td> {list.studentUser.usernameStud} </td>
                                <td><Button className='table-details-button' href={`http://localhost:3000/panelEvaluatePR/${list._id}`}>Evaluate</Button></td>
                                </tr>
                            )
                        )
                    }
                    </CDBTableBody>
                </CDBTable>
                </CDBContainer>
            </PanelTemplate>
        </>
    )
}

export default PanelEvaluatePR
