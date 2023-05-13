import React from 'react'
import MainScreen from './MainScreen'
import SupervisorSidebar from './SupervisorSidebar'
import {useParams } from 'react-router-dom';

const SupervisorTemplate = ({ children }) => {

  let pageURL = 'http://localhost:3000/'
  let pageTitle;

  const { id } = useParams();

  if (window.location.href === pageURL+'supervisorHomepage'){
    pageTitle = "Supervisor's Homepage";
  }
  else if (window.location.href === pageURL+'supervisorViewMeetingLog'|| window.location.href === pageURL+`supervisorViewMeetingLog/${id}`){
    pageTitle = "Student's Meeting Log";
  } 
  else if (window.location.href === pageURL+'supervisorViewRPD') {
    pageTitle = "View Research Proposal Defence Result";
  }
  else if (window.location.href === pageURL+'supervisorViewWCD') {
    pageTitle = "View Work Completion Defence Result";
  }
  else if (window.location.href === pageURL+'supervisorEvaluatePR' || window.location.href === pageURL+`supervisorEvaluatePR/${id}`) {
    pageTitle = "Progress Report Evaluation";
  }
  else if (window.location.href === pageURL+'supervisorViewPR') {
    pageTitle = "View Progress Report Result";
  }
  else if (window.location.href === pageURL+'supervisorViewProfile') {
    pageTitle = "Supervisor's Profile";
  }
  else if (window.location.href === pageURL+'supervisorViewStudentData') {
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
