import React from 'react'
import MainScreen from './MainScreen'
import FacultySidebar from './FacultySidebar'
import {useParams } from 'react-router-dom';

const FacultyTemplate = ({ children }) => {

  let pageURL = 'http://localhost:3000/'
  let pageTitle;

  const { id } = useParams();

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
  else if (window.location.href === pageURL+'facultyAssignNumSupervisor' || window.location.href === pageURL+`facultyAssignNumSupervisor/${id}`) {
    pageTitle = "Assign Number of Supervision";
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
