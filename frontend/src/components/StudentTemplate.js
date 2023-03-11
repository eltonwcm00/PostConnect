import React from 'react'
import MainScreen from './MainScreen'
import StudentSidebar from './StudentSidebar'

const StudentTemplate = ({ children }) => {

  let pageURL = 'http://localhost:3000/'
  let pageTitle;

  if (window.location.href === pageURL+'#'){
    pageTitle = "#";
  }
  else if (window.location.href === pageURL+'#'){
    pageTitle = "#";
  } 
  else if (window.location.href === pageURL+'#') {
    pageTitle = "#";
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

export default SupervisorTemplate;