import {
    SUPERVISOR_LOGIN_FAIL,
    SUPERVISOR_LOGIN_REQUEST,
    SUPERVISOR_LOGIN_SUCCESS,
    SUPERVISOR_LOGOUT,
    SUPERVISOR_STUDENT_LIST_REQUEST,
    SUPERVISOR_STUDENT_LIST_SUCCESS,
    SUPERVISOR_STUDENT_LIST_FAIL,
    SUPERVISOR_CHOOSE_STUDENT_REQUEST,
    SUPERVISOR_CHOOSE_STUDENT_SUCCESS,
    SUPERVISOR_CHOOSE_STUDENT_FAIL,
} from "../constants/supervisorConstants";

import axios from "axios";

export const supervisorLogin = (usernameSup, password) => async (dispatch) => {
    try {
      dispatch({ type: SUPERVISOR_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/supervisor/supervisorLogin",
        { usernameSup, password},
        config
      );

      dispatch({ type: SUPERVISOR_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("supervisorInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: SUPERVISOR_LOGIN_FAIL,
        payload:
          error.response 
            ? error.response.data.message
            : error.message,
      });
    }
  }; 

export const supervisorLogout = () => async (dispatch) => {
  localStorage.removeItem("supervisorInfo");
  dispatch({ type: SUPERVISOR_LOGOUT });
};
