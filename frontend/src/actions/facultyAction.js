import {
    FACULTY_LOGIN_FAIL,
    FACULTY_LOGIN_REQUEST,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGOUT,
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
        "/api/faculty/facultyLogin",
        { userNameFac, password },
        config
      );
  
      dispatch({ type: FACULTY_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("facultyInfo", JSON.stringify(data));

    } catch (error) {
      dispatch({
        type: FACULTY_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const facultyLogout = () => async (dispatch) => {
    localStorage.removeItem("facultyInfo");
    dispatch({ type: FACULTY_LOGOUT });
  };
  