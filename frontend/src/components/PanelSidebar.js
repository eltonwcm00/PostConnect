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
import { panelLogout } from '../actions/panelAction';
  
  const PanelSidebar = () => {

    const panelState = useSelector((state) => state.panelLogin);
    const { panelInfo } = panelState;

    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(panelLogout());
    }

    return (
      <div
        style={{ display: "flex", height: "109vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <Row xs={1} md={1}>
                <a href="/panelHomepage" className="text-decoration-none"style={{ color: "inherit" }}>
                    <img src="/image/marking.png" alt="Panel Profile Image" height={60} width={60}/>
                </a>
                <Col className="header-name-container" style={{ marginTop: '8px'}}>{panelInfo  ? 'Hello, ' + panelInfo.usernamePanel : null}</Col>
            </Row>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="#" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa fa-user" className="sidebar-icon">User Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/panelEvaluateRPD" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa-solid fa-file-circle-check">Research Proposal Defence Evaluation </CDBSidebarMenuItem> 
              </NavLink>
              <NavLink exact to="#" activeClassName="activeClicked" className="sidebar-nav">
                <CDBSidebarMenuItem icon="fa-solid fa-file-circle-check"> Work Completion Defence Evaluation </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="#" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-file-circle-check">
                    Progress Report Evaluation
                </CDBSidebarMenuItem>
              </NavLink>
              <CDBSidebarMenuItem icon="fa-light fa-right-from-bracket">
                {panelInfo && <CDBBtn onClick={handleLogout} color="primary" style={{backgroundColor: 'transparent', 
                  fontWeight: 'normal',
                  marginLeft: -10,
                  color: '#c4c4c4',
                  boxShadow: 'none'
                }}>
                  Logout
                </CDBBtn>}
                {!panelInfo && <NavLink exact to="/panelLogin" activeClassName="activeClicked">Login</NavLink>}
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    );
  };

  export default PanelSidebar