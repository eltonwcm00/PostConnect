import React from 'react'
import MainScreen from './MainScreen'
import FacultySidebar from './FacultySidebar'
import { BASE_URL } from '../urlPath';
import { useParams } from 'react-router-dom';

const FacultyTemplate = ({ children }) => {

  let pageTitle;

  const { id } = useParams();

  if (window.location.href === BASE_URL+'facultyHomepage'){
    pageTitle = "Faculty's Homepage";
  }
  else if (window.location.href === BASE_URL+'facultyLogin'){
    pageTitle = "Faculty Login";
  }
  else if (window.location.href === BASE_URL+'facultyViewProfile'){
    pageTitle = "User Profile";
  }
  else if (window.location.href === BASE_URL+'facultyStudentRegistration'){
    pageTitle = "Student Registration";
  } 
  else if (window.location.href === BASE_URL+'facultyPanelRegistration') {
    pageTitle = "Panel Registration";
  }
  else if (window.location.href === BASE_URL+'facultySupervisorRegistration') {
    pageTitle = "Supervisor Registration";
  }
  else if (window.location.href === BASE_URL+'facultyAssignNumSupervisor' || window.location.href === BASE_URL+`facultyAssignNumSupervisor/${id}`) {
    pageTitle = "Assign Number of Supervision";
  }
  else if (window.location.href === BASE_URL+'facultyReadChooseStudent' || window.location.href === BASE_URL+`facultyReadChooseStudent/${id}`) {
    pageTitle = "Choose Student to Supervise";
  }
  else if (window.location.href === BASE_URL+'facultyEvaluateRPDApplication' || window.location.href === BASE_URL+`facultyEvaluateRPDApplication/${id}`) {
    pageTitle = "Research Proposal Defence Request Application";
  }
  else if (window.location.href === BASE_URL+'miscellaneous' || window.location.href === BASE_URL+`miscellaneous/${id}`) {
    pageTitle = "Miscellaneous";
  }
  else if (window.location.href === BASE_URL+'facultyEvaluateWCDApplication' || window.location.href === BASE_URL+`facultyEvaluateWCDApplication/${id}`) {
    pageTitle = "Work Completion Defence Request Application";
  }
  else if (window.location.href === BASE_URL+'facultyMonitorStudent' || window.location.href === BASE_URL+`facultyMonitorStudent/${id}`) {
    pageTitle = "Candidature Monitoring";
  }
  else if (window.location.href === BASE_URL+`panelProfileList/${id}` || window.location.href === BASE_URL+`supervisorProfileList/${id}` 
           || window.location.href === BASE_URL+`studentProfileList/${id}`) {
    pageTitle = "Edit User Profile";
  }
  else if (window.location.href === BASE_URL+'facultyViewStudentData' || window.location.href === BASE_URL+`facultyViewStudentData/${id}`) {
    pageTitle = "Student Data Report";
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
