import React from 'react'
import MainScreen from './MainScreen'
import StudentSidebar from './StudentSidebar'
import { BASE_URL } from '../urlPath'

const StudentTemplate = ({ children }) => {

  let pageTitle;

  if (window.location.href === BASE_URL+'studentHomepage'){
    pageTitle = "Student's Homepage";
  }
  else if (window.location.href === BASE_URL+'studentRequestRPD'){
    pageTitle = "Request For Research Proposal Defence";
  }
  else if (window.location.href === BASE_URL+'studentSubmitMeetingLog'){
    pageTitle = "Meeting Log Submission";
  } 
  else if (window.location.href === BASE_URL+'studentRequestWCD') {
    pageTitle = "Request For Work Completion Defence";
  }
  else if (window.location.href === BASE_URL+'studentSubmitPR') {
    pageTitle = "Progress Report";
  }
  else if (window.location.href === BASE_URL+'studentViewProfile') {
    pageTitle = "Student's Profile";
  }
  else {
    pageTitle = null;
  }
  
  return (
    <div className="container-fluid" style={{display: "contents"}}>
        <div className="row ">
          <div className="col">
            <StudentSidebar />
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

export default StudentTemplate;
