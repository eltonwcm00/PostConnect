import React from 'react'
import MainScreen from './MainScreen'
import StudentSidebar from './StudentSidebar'

const StudentTemplate = ({ children }) => {

  let pageURL = 'http://localhost:3000/'
  let pageTitle;

  if (window.location.href === pageURL+'studentHomepage'){
    pageTitle = "Student's Homepage";
  }
  else if (window.location.href === pageURL+'studentRequestRPD'){
    pageTitle = "Request For Research Proposal Defence";
  }
  else if (window.location.href === pageURL+'studentSubmitMeetingLog'){
    pageTitle = "Meeting Log Submission";
  } 
  else if (window.location.href === pageURL+'studentRequestWCD') {
    pageTitle = "Request For Work Completion Defence";
  }
  else if (window.location.href === pageURL+'#') {
    pageTitle = "#";
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
