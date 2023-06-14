import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { CDBContainer, CDBTable, CDBTableHeader, CDBTableBody } from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import { panelReadWCD } from "../../../actions/panelAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import PanelTemplate from "../../../components/PanelTemplate";
import ViewPDF from "../../../components/ViewPDF";

// import "./FacultyEvaluateRPDApplication.css";

const PanelEvaluateWCD = () => {
    
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const panelLogin = useSelector((state) => state.panelLogin);
    const { panelInfo } = panelLogin;

    const WCDList = useSelector((state) => state.panelReadApplication);
    const { loading, errorApplicationList, fetchApplicationList } = WCDList;

    useEffect(() => {
        dispatch(panelReadWCD());
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
                        <th className="table-desc-th">Schedule Date</th>
                        <th className="table-desc-th">Full Name</th>
                        <th className="table-desc-th">Full Thesis Title</th>
                        <th className="table-desc-th">Evaluation</th>
                    </tr>
                    </CDBTableHeader>
                    <CDBTableBody>
                    {
                        fetchApplicationList && fetchApplicationList.filter(x =>(x.status !== true && x.status !== false)).map((list) => (
                                <tr className='table-desc' key={list._id}>
                                <td> {moment(list.dateScheduleWCD).format('MMMM Do YYYY')} </td>
                                <td> {list.fullname} </td>
                                <td> {list.thesisTitle} </td>
                                <td><Button className='table-details-button' href={`http://localhost:3000/panelEvaluateWCD/${list._id}`}>Evaluate</Button></td>
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

export default PanelEvaluateWCD
