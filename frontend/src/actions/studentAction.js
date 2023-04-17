import {
    STUDENT_LOGIN_FAIL,
    STUDENT_LOGIN_REQUEST,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGOUT,

    STUDENT_CW_READ_REQUEST,
    STUDENT_CW_READ_SUCCESS,
    STUDENT_CW_READ_FAIL,

    STUDENT_CW_REQUEST,
    STUDENT_CW_SUCCESS,
    STUDENT_CW_FAIL,

    STUDENT_APPLICATION,
    STUDENT_MEETING_LOG,
    STUDENT_APPLICATION_2,
    PR_READ_REQUEST,
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

export const studentRPDReadRequest = () => async (dispatch, getState) => {
  try {
    dispatch({type: STUDENT_CW_READ_REQUEST});

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
      "http://localhost:5000/api/student/studentViewDataRequestRPD", config
    );
    dispatch({ type: STUDENT_CW_READ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_CW_READ_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};

export const studentRPDRequest = (fullName, miniThesisTitle, supervisorName, miniThesisPDF) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_CW_REQUEST });

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

    dispatch({ type: STUDENT_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: STUDENT_CW_FAIL,
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

export const studentSubmitMeetingLog = (dateMeetingLog, contentLog) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_CW_REQUEST });

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
      "http://localhost:5000/api/student/studentSubmitMeetingLog",
      { dateMeetingLog, contentLog },
      config
    );

    dispatch({ type: STUDENT_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: STUDENT_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
}; 

export const studentMeetingLogStatus = () => async (dispatch, getState) => {
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
      "http://localhost:5000/api/student/studentMeetingLogStatus", config
    );
    dispatch({ type: STUDENT_MEETING_LOG, payload: data });
  } catch (error) {
      console.log(error);
  }
};

export const studentWCDRequest = (fullName, thesisTitle, supervisorName, thesisPDF) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_CW_REQUEST });

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
      "http://localhost:5000/api/student/studentRequestWCD",
      { fullName, thesisTitle, supervisorName, thesisPDF},
      config
    );

    dispatch({ type: STUDENT_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: STUDENT_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
}; 

export const studentApplicationStatus2 = () => async (dispatch, getState) => {
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
      "http://localhost:5000/api/student/studentWCDApplicationStatus", config
    );
    dispatch({ type: STUDENT_APPLICATION_2, payload: data });
  } catch (error) {
      console.log(error);
  }
};

export const studentPRLandingPage = () => async (dispatch, getState) => {
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
      "http://localhost:5000/api/student/studentRegisterPRLandingPage", config
    );
    dispatch({ type: PR_READ_REQUEST, payload: data });
  } catch (error) {
      console.log(error);
  }
};

export const studentPRRegister = () => async (dispatch, getState) => {
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

    const { data } = await axios.post(
      "http://localhost:5000/api/student/studentRegisterPR", {}, config
    );
    dispatch({ type: STUDENT_CW_SUCCESS, payload: data });
  }  catch (error) {
    dispatch({
      type: STUDENT_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};