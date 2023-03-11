import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux"

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
      Hi, i am a panel
    </div>
  )
}

export default PanelHomepage
