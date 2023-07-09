import React from 'react'
import MainScreen from './MainScreen'
import PanelSidebar from './PanelSidebar';
import { BASE_URL } from '../urlPath';
import { useParams } from 'react-router-dom';

const PanelTemplate = ({ children }) => {

  let pageTitle;

  const { id } = useParams();

  if (window.location.href === BASE_URL+'panelHomepage'){
    pageTitle = "Panel's Homepage";
  }
  else if (window.location.href === BASE_URL+'panelEvaluateRPD' || window.location.href === BASE_URL+`panelEvaluateRPD/${id}`){
    pageTitle = "Research Proposal Defence Evaluation";
  }
  else if (window.location.href === BASE_URL+'panelEvaluateWCD' || window.location.href === BASE_URL+`panelEvaluateWCD/${id}`){
    pageTitle = "Work Completion Defence Evaluation";
  } 
  else if (window.location.href === BASE_URL+'panelEvaluatePR' || window.location.href === BASE_URL+`panelEvaluatePR/${id}`) {
    pageTitle = "Progress Report Evaluation";
  }
  else if (window.location.href === BASE_URL+'panelViewProfile') {
    pageTitle = "Panel's Profile";
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
