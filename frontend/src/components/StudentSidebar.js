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
import { studentLogout } from '../actions/studentAction';
  
  const StudentSidebar = () => {

    const studentState = useSelector((state) => state.studentLogin);
    const { studentInfo } = studentState;

    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(studentLogout());
    }

    return (
      <div
        style={{ display: "flex", height: "109vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <Row xs={1} md={1}>
                <a href="/studentHomepage" className="text-decoration-none"style={{ color: "inherit" }}>
                    <img src="/image/student.png" alt="Supervisor Profile Image" height={60} width={60}/>
                </a>
                <Col className="header-name-container" style={{ marginTop: '8px'}}>{studentInfo  ? 'Hello, ' + studentInfo.usernameStud : null}</Col>
            </Row>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="#" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-user" className="sidebar-icon">User Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/studentRequestRPD" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-file-text">Request For Research Proposal Defence</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="#" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-file-text"> Request For Work Completion Defence </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="#"  activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-sharp fa-regular fa-file-invoice">
                    Submit Progress Report
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/studentSubmitMeetingLog" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-sharp fa-regular fa-file-invoice">
                    Submit Meeting Log
                </CDBSidebarMenuItem>
              </NavLink>
              <CDBSidebarMenuItem icon="fa-light fa-right-from-bracket">
                {studentInfo && <CDBBtn onClick={handleLogout} color="primary" style={{backgroundColor: 'transparent', 
                  fontWeight: 'normal',
                  marginLeft: -10,
                  color: '#c4c4c4',
                  boxShadow: 'none'
                }}>
                  Logout
                </CDBBtn>}
                {!studentInfo && <NavLink exact to="/studentLogin" activeClassName="activeClicked">Login</NavLink>}
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    );
  };

  export default StudentSidebar