import React, { useEffect } from "react";
import moment from 'moment';
import SupervisorTemplate from "../../../components/SupervisorTemplate";
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
    <SupervisorTemplate>
      <h2 className="sub-heading">{moment().format(' Do MMMM ')}</h2>
    </SupervisorTemplate>
  )
}

export default SupervisorHomepage
