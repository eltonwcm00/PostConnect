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
import { facultyLogout } from '../actions/facultyAction';
  
  const FacultySidebar = () => {

    const facultyState = useSelector((state) => state.facultyLogin);
    const { facultyInfo } = facultyState;

    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(facultyLogout());
    }

    return (
      <div
        style={{ display: "flex", height: "109vh", overflow: "scroll initial", position: "fixed" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <Row xs={1} md={1}>
                <a href="/facultyHomepage" className="text-decoration-none"style={{ color: "inherit" }}>
                    <img src="/image/school.png" alt="React Image" height={60} width={60}/>
                </a>
                <Col className="header-name-container" style={{ marginTop: '8px'}}>{facultyInfo ? 'Hello, ' + facultyInfo.userNameFac : null}</Col>
            </Row>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/facultyRegister" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-plus" className="sidebar-icon-role">Role Registration</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/facultyViewProfile" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-user" className="sidebar-icon">User Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/facultyEvaluateRPDApplication" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-file-text">Research Proposal Defence Request Application</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/facultyEvaluateWCDApplication" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-file-text">
                  Work Completion Defence Request Application
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/facultyMonitorStudent">
                <CDBSidebarMenuItem icon="fa fa-users">
                  Candidature Monitoring
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/facultyAssignNumSupervisor">
                <CDBSidebarMenuItem icon="fa-regular fa-sitemap">
                  Assign Number of Supervision
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/facultyReadChooseStudent">
                <CDBSidebarMenuItem icon="fa-solid fa-arrow-pointer">
                  Choose Student to Supervise
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/#">
                <CDBSidebarMenuItem icon="fa-solid fa-chart-column">
                  Student Data Report
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/miscellaneous" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fas fa-cog" className="sidebar-icon-role">Miscellaneous</CDBSidebarMenuItem>
              </NavLink>
              <CDBSidebarMenuItem icon="fa-light fa-right-from-bracket">
                {facultyInfo && <CDBBtn onClick={handleLogout} color="primary" style={{backgroundColor: 'transparent', 
                  fontWeight: 'normal',
                  marginLeft: -10,
                  color: '#c4c4c4',
                  boxShadow: 'none'
                }}>
                  Logout
                </CDBBtn>}
                {!facultyInfo && <NavLink exact to="/facultyLogin">Login</NavLink>}
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    );
  };

export default FacultySidebar
