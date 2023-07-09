import React from 'react'
import MainScreen from './MainScreen'
import SupervisorSidebar from './SupervisorSidebar'
import {useParams } from 'react-router-dom';
import { BASE_URL } from '../urlPath';

const SupervisorTemplate = ({ children }) => {

  let pageTitle;

  const { id } = useParams();

  if (window.location.href === BASE_URL+'supervisorHomepage'){
    pageTitle = "Supervisor's Homepage";
  }
  else if (window.location.href === BASE_URL+'supervisorViewMeetingLog'|| window.location.href === BASE_URL+`supervisorViewMeetingLog/${id}`){
    pageTitle = "Student's Meeting Log";
  } 
  else if (window.location.href === BASE_URL+'supervisorViewRPD') {
    pageTitle = "View Research Proposal Defence Result";
  }
  else if (window.location.href === BASE_URL+'supervisorViewWCD') {
    pageTitle = "View Work Completion Defence Result";
  }
  else if (window.location.href === BASE_URL+'supervisorEvaluatePR' || window.location.href === BASE_URL+`supervisorEvaluatePR/${id}`) {
    pageTitle = "Progress Report Evaluation";
  }
  else if (window.location.href === BASE_URL+'supervisorViewPR') {
    pageTitle = "View Progress Report Result";
  }
  else if (window.location.href === BASE_URL+'supervisorViewProfile') {
    pageTitle = "Supervisor's Profile";
  }
  else if (window.location.href === BASE_URL+'supervisorViewStudentData') {
    pageTitle = "Student Data Report";
  }
  else {
    pageTitle = null;
  }
  
  return (
    <div className="container-fluid" style={{display: "contents"}}>
        <div className="row ">
          <div className="col">
            <SupervisorSidebar />
          </div>
          <div className="col-9">
            <MainScreen title={pageTitle}>
              {children}
            </MainScreen>
          </div>
        </div>
    </div>        
  )
}

export default SupervisorTemplate;
