import {
    FACULTY_LOGIN_FAIL,
    FACULTY_LOGIN_REQUEST,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGOUT,
    FACULTY_REGISTER_PANEL_FAIL,
    FACULTY_REGISTER_PANEL_REQUEST,
    FACULTY_REGISTER_PANEL_SUCCESS,
} from "../constants/facultyConstants";

import axios from "axios";

export const facultyLogin = (userNameFac, password) => async (dispatch) => {
    try {
      dispatch({ type: FACULTY_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/faculty/facultyLogin",
        { userNameFac, password},
        config
      );

      dispatch({ type: FACULTY_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("facultyInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: FACULTY_LOGIN_FAIL,
        payload:
          error.response 
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const facultyLogout = () => async (dispatch) => {
    localStorage.removeItem("facultyInfo");
    dispatch({ type: FACULTY_LOGOUT });
  };
  
  export const facultyPanelRegistration = (userNamePanel, password, cfrmPassword) => async (dispatch, getState) => {
    try {
      dispatch({ type: FACULTY_REGISTER_PANEL_REQUEST });

        const {
          facultyLogin: { facultyInfo },
        } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${facultyInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/faculty/facultyPanelRegistration",
        { userNamePanel, password, cfrmPassword },
        config
      );
  
      dispatch({ type: FACULTY_REGISTER_PANEL_SUCCESS, payload: data });

      dispatch({ type: FACULTY_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("facultyInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: FACULTY_REGISTER_PANEL_FAIL,
        payload:
          error.response 
          ? error.response.data.message
          : error.message,
      });
    }
  };