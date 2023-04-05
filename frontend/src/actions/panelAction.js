import {
    PANEL_LOGIN_FAIL,
    PANEL_LOGIN_REQUEST,
    PANEL_LOGIN_SUCCESS,
    PANEL_LOGOUT,
    PANEL_RPD_LIST_REQUEST,
    PANEL_RPD_LIST_SUCCESS,
    PANEL_RPD_LIST_FAIL,
    PANEL_UPDATE_APPLICATION_REQUEST,
    PANEL_APPROVE_APPLICATION_SUCCESS,
    PANEL_UPDATE_APPLICATION_FAIL,
} from "../constants/panelConstants";

import axios from "axios";

export const panelLogin = (usernamePanel, password) => async (dispatch) => {
    try {
      dispatch({ type: PANEL_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/panel/panelLogin",
        { usernamePanel, password},
        config
      );

      dispatch({ type: PANEL_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("panelInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: PANEL_LOGIN_FAIL,
        payload:
          error.response 
            ? error.response.data.message
            : error.message,
      });
    }
  }; 

export const panelLogout = () => async (dispatch) => {
  localStorage.removeItem("panelInfo");
  dispatch({ type: PANEL_LOGOUT });
};

export const panelReadRPD = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_RPD_LIST_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/panel/panelReadRPD", config);

    dispatch({
      type: PANEL_RPD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_RPD_LIST_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const panelEvaluatePassRPD = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_UPDATE_APPLICATION_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.put(`http://localhost:5000/api/panel/panelEvaluateRPD/${id}`, {}, config);

    dispatch({
      type: PANEL_APPROVE_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

