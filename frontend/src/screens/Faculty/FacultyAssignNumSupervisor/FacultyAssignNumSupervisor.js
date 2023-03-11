import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { facultyReadAssignSupervision } from "../../../actions/facultyAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";

const FacultyAssignNumSupervisor = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const facultyLogin = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyLogin;

    const supervisorList = useSelector((state) => state.facultyReadAssignSupervision);
    const { loading, error, fetchSupervisorList } = supervisorList;

    useEffect(() => {
        dispatch(facultyReadAssignSupervision());
        if (!facultyInfo) {
          navigate("/");
        }
      }, [
        dispatch,
        navigate,
        facultyInfo,
    ]);

  return (
    <>
    <div>Hello</div>
    
    {
    console.log(fetchSupervisorList)}
      {fetchSupervisorList && fetchSupervisorList.map((list) => 
      ( <div key={list._id}>
          {list.usernameSup}
        </div>
      ))
    }
    </>
  )
}

export default FacultyAssignNumSupervisor
