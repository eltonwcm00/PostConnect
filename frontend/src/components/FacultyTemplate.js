import React from 'react'
import MainScreen from './MainScreen'
import FacultySidebar from './FacultySidebar'

const FacultyTemplate = ({ children }) => {

  let pageURL = 'http://localhost:3000/'
  let pageTitle;

  if (window.location.href === pageURL+'facultyLogin'){
    pageTitle = "Faculty Login";
  }
  else if (window.location.href === pageURL+'facultyStudentRegistration'){
    pageTitle = "Student Registration";
  } 
  else if (window.location.href === pageURL+'facultyPanelRegistration') {
    pageTitle = "Panel Registration";
  }
  else if (window.location.href === pageURL+'facultySupervisorRegistration') {
    pageTitle = "Supervisor Registration";
  }
  else {
    pageTitle = null;
  }
  
  return (
    <div className="container-fluid" style={{display: "contents"}}>
        <div className="row ">
          <div className="col">
            <FacultySidebar />
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

export default FacultyTemplate;