import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux"
import PanelSidebar from "../../../components/PanelSidebar";

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
    <div>
      <PanelSidebar />
    </div>
  )
}

export default PanelHomepage
