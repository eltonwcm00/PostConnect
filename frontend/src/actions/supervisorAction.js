import {
    SUPERVISOR_LOGIN_FAIL,
    SUPERVISOR_LOGIN_REQUEST,
    SUPERVISOR_LOGIN_SUCCESS,
    SUPERVISOR_LOGOUT,
    SUPERVISOR_CW_REQUEST,
    SUPERVISOR_CW_SUCCESS,
    SUPERVISOR_CW_FAIL
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
    dispatch({ type: SUPERVISOR_CW_REQUEST });

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

    dispatch({ type: SUPERVISOR_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};

export const supervisorReadRPDResult = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPERVISOR_CW_REQUEST });

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
      "http://localhost:5000/api/supervisor/supervisorReadRPDResult", config
    );

    dispatch({ type: SUPERVISOR_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};

export const supervisorReadWCDResult = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPERVISOR_CW_REQUEST });

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
      "http://localhost:5000/api/supervisor/supervisorReadWCDResult", config
    );

    dispatch({ type: SUPERVISOR_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};