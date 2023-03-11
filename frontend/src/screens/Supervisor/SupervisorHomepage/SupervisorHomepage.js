import React, { useEffect } from "react";
import SupervisorSidebar from "../../../components/SupervisorSidebar";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const SupervisorHomepage = () => {

  let navigate = useNavigate();
    
  const supervisorLoginState = useSelector((state) => state.supervisorLogin);
  const { supervisorInfo } = supervisorLoginState;

  useEffect(() => {
      if (!supervisorInfo) {
        navigate("/");
      }
  }, [navigate, supervisorInfo]);

  return (
    <div>
      <SupervisorSidebar />
    </div>
  )
}

export default SupervisorHomepage
