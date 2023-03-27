import {
    STUDENT_LOGIN_FAIL,
    STUDENT_LOGIN_REQUEST,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGOUT,

    STUDENT_RPD_REQUEST,
    STUDENT_RPD_SUCCESS,
    STUDENT_RPD_FAIL,

    STUDENT_APPLICATION,
} from "../constants/studentConstants";

import axios from "axios";

export const studentLogin = (usernameStud, password) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/student/studentLogin",
        { usernameStud, password},
        config
      );

      dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("studentInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: STUDENT_LOGIN_FAIL,
        payload:
          error.response 
            ? error.response.data.message
            : error.message,
      });
    }
  }; 

export const studentLogout = () => async (dispatch) => {
  localStorage.removeItem("studentInfo");
  dispatch({ type: STUDENT_LOGOUT });
};

export const studentRPDRequest = (fullName, miniThesisTitle, supervisorName, miniThesisPDF) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_RPD_REQUEST });

    const {
      studentLogin: { studentInfo },
    } = getState();
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${studentInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/student/studentRequestRPD",
      { fullName, miniThesisTitle, supervisorName, miniThesisPDF},
      config
    );

    dispatch({ type: STUDENT_RPD_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: STUDENT_RPD_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
}; 

export const studentApplicationStatus = () => async (dispatch, getState) => {
  try {
    const {
      studentLogin: { studentInfo },
    } = getState();
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${studentInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/student/studentRPDApplicationStatus", config
    );
    dispatch({ type: STUDENT_APPLICATION, payload: data });
  } catch (error) {
    console.log(error);
  }

};