import React from 'react'
import MainScreen from './MainScreen'
import PanelSidebar from './PanelSidebar'
import { useParams } from 'react-router-dom';

const PanelTemplate = ({ children }) => {

  let pageURL = 'http://localhost:3000/'
  let pageTitle;

  const { id } = useParams();

  if (window.location.href === pageURL+'panelHomepage'){
    pageTitle = "Panel's Homepage";
  }
  else if (window.location.href === pageURL+'panelEvaluateRPD' || window.location.href === pageURL+`panelEvaluateRPD/${id}`){
    pageTitle = "Research Proposal Defence Evaluation";
  }
  else if (window.location.href === pageURL+'panelEvaluateWCD' || window.location.href === pageURL+`panelEvaluateWCD/${id}`){
    pageTitle = "Work Completion Defence Evaluation";
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
            <PanelSidebar />
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

export default PanelTemplate;
