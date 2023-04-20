import React, { useEffect, useState } from "react";
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux"
import PanelTemplate from "../../../components/PanelTemplate";
import ViewPDF from "../../../components/ViewPDF";

const PanelHomepage = () => {
  
  let navigate = useNavigate();
    
  const panelLoginState = useSelector((state) => state.panelLogin);
  const { panelInfo } = panelLoginState;

  useEffect(() => {
      if (!panelInfo) {
        navigate("/");
      }
  }, [navigate, panelInfo]);

  return (
    <PanelTemplate>
      <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
      {/* <ViewPDF /> */}
    </PanelTemplate>
  )
}

export default PanelHomepage
