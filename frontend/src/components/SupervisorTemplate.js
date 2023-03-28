import React from 'react'
import MainScreen from './MainScreen'
import SupervisorSidebar from './SupervisorSidebar'

const SupervisorTemplate = ({ children }) => {

  let pageURL = 'http://localhost:3000/'
  let pageTitle;

  if (window.location.href === pageURL+'supervisorHomepage'){
    pageTitle = "Supervisor's Homepage";
  }
  else if (window.location.href === pageURL+'supervisorReadChooseStudent'){
    pageTitle = "Choose Student to Supervise";
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
