import React, { useEffect } from "react";
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
      Hi, i am a supervisor
    </div>
  )
}

export default SupervisorHomepage
