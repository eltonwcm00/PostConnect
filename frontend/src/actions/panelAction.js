import {
    PANEL_LOGIN_FAIL,
    PANEL_LOGIN_REQUEST,
    PANEL_LOGIN_SUCCESS,
    PANEL_LOGOUT,
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