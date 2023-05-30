import React from 'react'
import './Sidebar.css';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBBtn
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { supervisorLogout } from '../actions/supervisorAction';
  
  const SupervisorSidebar = () => {

    const supervisorState = useSelector((state) => state.supervisorLogin);
    const { supervisorInfo } = supervisorState;

    const dispatch = useDispatch();

    const handleLogout = () => {
      if (window.confirm("Are you sure?")) { 
        dispatch(supervisorLogout()); 
      }
    }

    return (
      <div
        style={{ display: "flex", height: "109vh", overflow: "scroll initial", position: "fixed" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <Row xs={1} md={1}>
                <a href="/supervisorHomepage" className="text-decoration-none"style={{ color: "inherit" }}>
                    <img src="/image/teacher.png" alt="Supervisor Profile Image" height={60} width={60}/>
                </a>
                <Col className="header-name-container" style={{ marginTop: '8px'}}>{supervisorInfo  ? 'Hello, ' + supervisorInfo.usernameSup : null}</Col>
            </Row>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/supervisorViewProfile" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-user" className="sidebar-icon">User Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/supervisorEvaluatePR">
                <CDBSidebarMenuItem icon="fa-solid fa-file-circle-check">Progress Report Evaluation</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/supervisorViewRPD" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa-solid fa-magnifying-glass"> View Research Proposal Defence Result </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/supervisorViewWCD">
                <CDBSidebarMenuItem icon="fa-solid fa-magnifying-glass">
                  View Work Completion Defence Result
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/supervisorViewPR">
                <CDBSidebarMenuItem icon="fa-solid fa-magnifying-glass">
                  View Progress Report Result
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/supervisorViewMeetingLog">
                <CDBSidebarMenuItem icon="fa-solid fa-magnifying-glass">
                  View Meeting Log
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/supervisorViewStudentData">
                <CDBSidebarMenuItem icon="fa-solid fa-chart-column">
                  Student Data Report
                </CDBSidebarMenuItem>
              </NavLink>
              <CDBSidebarMenuItem icon="fa-light fa-right-from-bracket">
                {supervisorInfo && <CDBBtn onClick={handleLogout} color="primary" style={{backgroundColor: 'transparent', 
                  fontWeight: 'normal',
                  marginLeft: -10,
                  color: '#c4c4c4',
                  boxShadow: 'none'
                }}>
                  Logout
                </CDBBtn>}
                {!supervisorInfo && <NavLink exact to="/supervisorLogin">Login</NavLink>}
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    );
  };

  export default SupervisorSidebar