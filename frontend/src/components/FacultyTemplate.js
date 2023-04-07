import React from 'react'
import MainScreen from './MainScreen'
import FacultySidebar from './FacultySidebar'
import {useParams } from 'react-router-dom';

const FacultyTemplate = ({ children }) => {

  let pageURL = 'http://localhost:3000/'
  let pageTitle;

  const { id } = useParams();

  if (window.location.href === pageURL+'facultyHomepage'){
    pageTitle = "Faculty's Homepage";
  }
  else if (window.location.href === pageURL+'facultyLogin'){
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
  else if (window.location.href === pageURL+'facultyReadChooseStudent' || window.location.href === pageURL+`facultyReadChooseStudent/${id}`) {
    pageTitle = "Choose Student to Supervise";
  }
  else if (window.location.href === pageURL+'facultyEvaluateRPDApplication' || window.location.href === pageURL+`facultyEvaluateRPDApplication/${id}`) {
    pageTitle = "Research Proposal Defence Request Application";
  }
  else if (window.location.href === pageURL+'facultySubjectRegistration' || window.location.href === pageURL+`facultySubjectRegistration/${id}`) {
    pageTitle = "Assign Student With Passed Subjects";
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
