import {
    SUPERVISOR_LOGIN_FAIL,
    SUPERVISOR_LOGIN_REQUEST,
    SUPERVISOR_LOGIN_SUCCESS,
    SUPERVISOR_LOGOUT,
    SUPERVISOR_MEETING_LOG_REQUEST,
    SUPERVISOR_MEETING_LOG_SUCCESS,
    SUPERVISOR_MEETING_LOG_FAIL
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

export const supervisorReadMeetingLog = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPERVISOR_MEETING_LOG_REQUEST });

    const {
      supervisorLogin: { supervisorInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/supervisor/supervisorReadMeetingLog", config
    );

    dispatch({ type: SUPERVISOR_MEETING_LOG_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_MEETING_LOG_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};