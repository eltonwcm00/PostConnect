import React from 'react'
import './Sidebar.css';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem
  } from "cdbreact";
  import { NavLink } from "react-router-dom";
  import { Row, Col } from 'react-bootstrap';
  
  const Sidebar = () => {
    return (
      <div
        style={{ display: "flex", height: "109vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <Row xs={1} md={1}>
                <a href="/" className="text-decoration-none"style={{ color: "inherit" }}>
                    <img src="/image/school.png" alt="React Image" height={60} width={60}/>
                </a>
                <Col className="header-name-container" style={{ marginTop: '8px'}}>Hello, FAC001</Col>
            </Row>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-plus" className="sidebar-icon-role">Role Registration</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/tables" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-user" className="sidebar-icon">User Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/profile" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-file-text">Research Proposal Defence Request Application</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/analytics" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-file-text">
                  Work Completion Defence Request Application
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa fa-users">
                  Candidature Monitoring
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/hero404" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-sitemap">
                  Assign Number of Supervision
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/hero404" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-chart-column">
                  Student Data Report
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/hero404" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-light fa-right-from-bracket">
                  Logout
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    );
  };

export default Sidebar
